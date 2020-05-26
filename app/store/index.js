import createPersistedState from 'vuex-persistedstate'

export const state = () => ({
})
export const mutations = {
}

export const actions = {
  nuxtClientInit({ commit, state, dispatch }, { req }) {
    createPersistedState()(this)
  }
}
