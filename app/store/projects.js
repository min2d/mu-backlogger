import jsonata from 'jsonata'
import { ToastProgrammatic as Toast } from 'buefy'

export const state = () => ({
  items: [],
  externals: [] // 付加情報はIDが同じもの同士をgetItem, getItemsでマージする
})
export const getters = {
  getItem(state) {
    return (projectKey) => {
      state.items.find(item => item.projectKey === projectKey)
    }
  },
  getItems(state) {
    const mergedItems = []
    state.items.forEach((item) => {
      const external = state.externals.find((ext) => {
        return ext.id === item.id
      })
      mergedItems.push(Object.assign({}, item, external))
    })
    return mergedItems
  },
  getItemsGroupedById(state, getters) {
    const hash = { items: getters.getItems }
    const obj = jsonata('items{$string($.id):($)}').evaluate(hash)
    return obj
  }
}
export const mutations = {
  setItems(state, { items }) {
    state.items = items
  },
  setExternal(state, { external }) {
    const index = state.externals.findIndex((ext) => {
      return ext.id === external.id
    })
    if (index >= 0) {
      state.externals.splice(index, 1, Object.assign({}, state.externals[index], external))
    } else {
      state.externals.push(external)
    }
  }
}
export const actions = {
  async loadItems({ commit, state, dispatch }) {
    if (state.items.length > 0) return
    await dispatch('fetchItems')
  },
  async fetchItems({ commit, rootGetters, rootState }) {
    if (!rootState.settings.userId) { Toast.open('settingsが未入力です'); return }

    const items = await this.$axios.$get(
      rootGetters['settings/apiBase'] + '/projects', {
        params: {
          apiKey: rootState.settings.apiKey
        }
      }
    )
    for (const item of items) {
      const projectKey = item.projectKey
      try {
        const customFields = await this.$axios.$get(
          `${rootGetters['settings/apiBase']}/projects/${projectKey}/customFields`, {
            params: {
              apiKey: rootState.settings.apiKey
            }
          }
        )
        const completedAtField = customFields.find((field) => { return field.name === rootState.settings.customFieldName })
        if (completedAtField) {
          item.completedAtFieldId = completedAtField.id
        }
      } catch (error) {
        console.log(error)
      }
    }
    commit('setItems', { items })
  }
}
