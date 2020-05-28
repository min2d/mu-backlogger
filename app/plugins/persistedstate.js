import createPersistedState from 'vuex-persistedstate'
export default ({ store }) => {
  createPersistedState({
    key: 'mu-backlogger'
  })(store)
}
