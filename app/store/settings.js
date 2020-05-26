export const state = () => ({
  userId: null,
  apiKey: null,
  githubUrlBase: null,
  backlogUrlBase: null,
  customFieldName: '完了日'
})

export const getters = {
  // authed(state) {
  //   return (state.userId && state.apiKey)
  // }
  apiBase(state) {
    if (!state.backlogUrlBase || state.backlogUrlBase.length === 0) return ''
    return state.backlogUrlBase + '/api/v2'
  }
}

const _mutations = {
}
const setterKeys = [
  'userId', 'apiKey', 'githubUrlBase', 'backlogUrlBase', 'customFieldName'
]
// 単純なsetter, clearer
setterKeys.forEach((item) => {
  _mutations[`set${item.charAt(0).toUpperCase() + item.slice(1)}`] = function (state, value) {
    state[item] = value
  }
  _mutations[`clear${item.charAt(0).toUpperCase() + item.slice(1)}`] = function (state) {
    if (Array.isArray(state[item])) {
      state[item] = []
    } else {
      state[item] = null
    }
  }
})

// mutationsを個別に書く場合は、ここに_mutations[name]=functionを追加

export const mutations = _mutations

// export const actions = {
//   clearAll({ commit }) {
//     commit('clearUserID')
//     commit('clearApiKey')
//     commit('clearGithubUrlBase')
//     commit('clearBacklogUrlBase')
//   }
// }
