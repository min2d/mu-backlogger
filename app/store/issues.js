import moment from 'moment'
import jsonata from 'jsonata'
import { ToastProgrammatic as Toast } from 'buefy'

export const state = () => ({
  items: [],
  item: {},
  filterIdSelection: 'all'
})

export const getters = {
  filtered(state, getters) {
    const issues = state.items
    const query = getters.filters[state.filterIdSelection].query
    try {
      return jsonata(query).evaluate({ issues })
    } catch {
      console.log('invalid query')
      return []
    }
  },
  filters() {
    return {
      all: { name: '全て', query: 'issues' },
      unCompleted: { name: '完了以外', query: '[issues[status.name!="完了"]]' },
      completed: { name: '完了', query: '[issues[status.name="完了"]]' },
      completedThisMonth: { name: '今月完了', query: `[issues[completedAt!=null][$contains(completedAt, "${moment().format('YYYY-MM-')}")]]` },
      completedLastMonth: { name: '先月完了', query: `[issues[completedAt!=null][$contains(completedAt, "${moment().add(-1, 'month').format('YYYY-MM-')}")]]` }
    }
  },
  // プロジェクトごとの合計時間
  completedThisMonthHours(state, getters) {
    const issues = state.items
    const query = `issues{$substringBefore(issueKey,'-'):$sum($[completedAt!=null][actualHours!=null][actualHours!=0][$contains(completedAt, "${moment().format('YYYY-MM-')}")].actualHours)}`
    try {
      const hash = jsonata(query).evaluate({ issues })
      const arr = []
      Object.keys(hash).forEach((key) => {
        arr.push({
          projectKey: key,
          hours: hash[key]
        })
      })
      return arr
    } catch (e) {
      console.log('invalid query', e)
      return []
    }
  },
  completedLastMonthHours(state, getters) {
    const issues = state.items
    const query = `issues{$substringBefore(issueKey,'-'):$sum($[completedAt!=null][actualHours!=null][actualHours!=0][$contains(completedAt, "${moment().subtract(1, 'months').format('YYYY-MM-')}")].actualHours)}`
    try {
      const hash = jsonata(query).evaluate({ issues })
      const arr = []
      Object.keys(hash).forEach((key) => {
        arr.push({
          projectKey: key,
          hours: hash[key]
        })
      })
      return arr
    } catch (e) {
      console.log('invalid query', e)
      return []
    }
  }
}

export const mutations = {
  setItems(state, { items }) {
    state.items = items
  },
  setItem(state, { item }) {
    state.item = item
  },
  setFilterIdSelection(state, filterId) {
    state.filterIdSelection = filterId
  }
}

export const actions = {
  // indexも毎回fetchにしたのでnot used
  // async loadItems({ commit, rootState, state, dispatch }) {
  //   if (state.items.length > 0) return
  //   await dispatch('fetchItems')
  // },
  async fetchItems({ commit, rootState, rootGetters }) {
    // カスタム項目はリクエストで指定できないのでjsonataフィルタで対応
    if (!rootState.settings.userId) { Toast.open('settingsが未入力です'); return }
    const items1 = await this.$axios.$get(
      rootGetters['settings/apiBase'] + '/issues', {
        params: {
          statusId: [1, 2, 3],
          assigneeId: [rootState.settings.userId],
          apiKey: rootState.settings.apiKey,
          count: 100
        }
      }
    )
    const items2 = await this.$axios.$get(
      rootGetters['settings/apiBase'] + '/issues', {
        params: {
          statusId: [4],
          updatedSince: moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD'),
          assigneeId: [rootState.settings.userId],
          apiKey: rootState.settings.apiKey,
          count: 100
        }
      }
    )
    const items = items1.concat(items2)

    for (const item of items) {
      const project = rootGetters['projects/getItemsGroupedById'][item.projectId]
      addOptionals(item, project)
    }
    commit('setItems', { items })
    Toast.open('updated')
  },
  async loadItem({ commit, rootState, state, dispatch }, { id }) {
    const item = state.items.find((item) => { return item.id === id })
    if (item) {
      commit('setItem', { item })
      return
    }
    await dispatch('fetchItem', { id })
  },
  async fetchItem({ commit, rootState, rootGetters }, { id }) {
    if (!rootState.settings.userId) { Toast.open('settingsが未入力です'); return }
    const item = await this.$axios.$get(
      (rootGetters['settings/apiBase'] + '/issues/' + id), {
        params: {
          apiKey: rootState.settings.apiKey
        }
      }
    )
    const project = rootGetters['projects/getItemsGroupedById'][item.projectId]
    addOptionals(item, project)
    commit('setItem', { item })
  },

  // 完了日を今日、ステータスを完了に
  async completeToday({ commit, rootState, rootGetters, dispatch }, { item }) {
    const updateParams = {
      statusId: 4
    }
    const project = rootGetters['projects/getItemsGroupedById'][item.projectId]
    const completedAtFieldId = project.completedAtFieldId
    updateParams['customField_' + completedAtFieldId] = moment().format('YYYY-MM-DD')

    await dispatch('updateItem', { item, updateParams })
  },

  // 完了日を先月末、ステータスを完了に
  async completeLastMonth({ commit, rootState, rootGetters, dispatch }, { item }) {
    const updateParams = {
      statusId: 4
    }
    const project = rootGetters['projects/getItemsGroupedById'][item.projectId]
    const completedAtFieldId = project.completedAtFieldId
    updateParams['customField_' + completedAtFieldId] = moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD')

    await dispatch('updateItem', { item, updateParams })
  },

  async addHours({ commit, rootState, rootGetters, dispatch }, { item, hours }) {
    const updateParams = {
      actualHours: item.actualHours ? (Number(item.actualHours) + Number(hours)) : hours
    }
    await dispatch('updateItem', { item, updateParams })
  },

  async writeHours({ commit, rootState, rootGetters, dispatch }, { item, hours }) {
    const updateParams = {
      actualHours: hours
    }
    await dispatch('updateItem', { item, updateParams })
  },

  // issueアップデート
  async updateItem({ commit, rootState, rootGetters, dispatch }, { item, updateParams }) {
    const defaultParams = {
      apiKey: rootState.settings.apiKey,
      comment: 'update from api'
    }
    const params = Object.assign(defaultParams, updateParams)
    try {
      await this.$axios({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'patch',
        url: (rootGetters['settings/apiBase'] + '/issues/' + item.id),
        params
      })
      await dispatch('fetchItem', { id: item.id })
      Toast.open('updated')
    } catch (e) {
      Toast.open(e)
    } finally {
    }
  }
}

export const addOptionals = (item, project) => {
  const completedAt = item.customFields.find((f) => { return f.id === project.completedAtFieldId })
  if (completedAt) {
    item.completedAt = completedAt.value ? moment(completedAt.value).format('YYYY-MM-DD') : null
  }
  if (project.github) {
    item.github = project.github
  }
  if (project.color) {
    item.color = project.color
  }
}
