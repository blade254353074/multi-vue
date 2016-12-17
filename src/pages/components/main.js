import Vue from 'vue'
import VueRouter from 'vue-router'
import OfflinePlugin from 'offline-plugin/runtime'

import './app.scss'
import App from './App'
import router from './router'

OfflinePlugin.install()
Vue.use(VueRouter)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
