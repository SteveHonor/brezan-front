export default {
  csrf: state => {
    return state.csrf
  },

  user (state) {
    return state.user
  },

  signedIn (state) {
    return state.signedIn
  },

  isAdmin (state) {
    return Object.keys(state.user).length > 0 && state.user.constructor === Object
  },

  isClient (state) {
    return state.client
  },

  token (state) {
    return state.token
  },

  title (state) {
    return state.title
  }
}
