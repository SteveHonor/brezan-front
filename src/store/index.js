import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import state from './state'

// Inject Vuex
Vue.use(Vuex)

export default new Vuex.Store({
  mutations,
  getters,
  actions,
  state,
  plugins: [createPersistedState()]
})
