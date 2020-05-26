import jsonata from 'jsonata'
export const state = () => ({
  result: ''
})

export const mutations = {
  setResult(state, str) {
    state.result = str
  }
}

export const actions = {
  exec({ commit, rootState, state, dispatch }, query) {
    const issues = rootState.issues.items
    try {
      const result = jsonata(query).evaluate({ issues })
      commit('setResult', result)
    } catch {
      console.log('invalid query')
    }
  }
}
