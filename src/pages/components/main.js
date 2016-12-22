import Vue from 'vue'
import VueRouter from 'vue-router'

import './app.scss'
import App from './App'
import router from './router'

Vue.use(VueRouter)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
