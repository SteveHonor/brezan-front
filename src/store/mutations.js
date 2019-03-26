export default {
  'LOGIN_USER' (state) {
    state.signedIn = true
    state.client = false
  },

  'LOGOUT_USER' (state) {
    state.signedIn = false
    state.user = {}
  },

  'USER' (state, user) {
    state.user = user
  },

  'CSRF' (state, csrf) {
    state.csrf = csrf
  },

  'SET_CLIENT' (state, token) {
    state.client = true
    state.token = token
  },

  'UNSET_CLIENT' (state) {
    state.client = false
  },

  'SET_TITLE' (state, title) {
    state.title = title
  }
}
