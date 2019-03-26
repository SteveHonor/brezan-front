import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'

import VueAxios from 'vue-axios'
import {
  securedAxiosInstance,
  plainAxiosInstance
} from './backend/axios'

Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})

import VueFilter from 'vue-filter'
Vue.use(VueFilter)

import {VueMasonryPlugin} from 'vue-masonry'
Vue.use(VueMasonryPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  securedAxiosInstance,
  plainAxiosInstance,
  render: h => h(App)
}).$mount('#app')
