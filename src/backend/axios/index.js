import axios from 'axios'
import store from './../../store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })

// var API_SECURE = 'http://localhost:3000'
var API_SECURE = 'https://brezan.herokuapp.com'

if (!store.getters.user.email) {
  delete localStorage.csrf
  delete localStorage.signedIn
  delete localStorage.email
}

const securedAxiosInstance = axios.create({
  baseURL: API_SECURE,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Accept': 'application/json; charset=utf-8'
  }
})

const plainAxiosInstance = axios.create({
  baseURL: API_SECURE,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
    'Accept': 'application/json; charset=utf-8'
  }
})

securedAxiosInstance.interceptors.request.use(config => {
  const method = config.method.toUpperCase()
  NProgress.start()
  NProgress.set(0.4)
  // NProgress.configure({ parent: '#page-wrapper' })


  if (method !== 'OPTIONS' && method !== 'GET') {
    config.headers = {
      ...config.headers,
      'X-CSRF-TOKEN': store.getters.csrf,
    }
  } else {
    config.headers = {
      ...config.headers,
    }
  }

  return config
})

securedAxiosInstance.interceptors.response.use(response => {
  setTimeout(function () {
    NProgress.done(true)
  }, 200)

  return response
})

export { securedAxiosInstance, plainAxiosInstance }
