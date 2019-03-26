export default {
  login ({ commit }) {
    commit('LOGIN_USER')
    localStorage.setItem('lock', true)
  },

  user ({ commit }, user) {
    commit('USER', user)
  },

  logout ({ commit }) {
    commit('LOGOUT_USER')
    localStorage.removeItem('lock')
  },

  csrf ({commit}, csrf) {
    commit('CSRF', csrf)
  },

  setClient ({commit}, token) {
    commit('SET_CLIENT', token)
  },

  unsetClient ({commit}) {
    commit('UNSET_CLIENT')
  },

  setTitle ({commit}, title) {
    commit('SET_TITLE', title)
  }
}
