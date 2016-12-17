import Vue from 'vue'
import VueRouter from 'vue-router'

import './app.scss'
import App from './App'
import Index from './views/Index'

const { origin } = window.location
const isGithub = origin.indexOf('github.io') > -1

const router = new VueRouter({
  mode: isGithub ? 'hash' : 'history',
  routes: [
    { path: '/', component: Index },
    { path: '*', component: () => System.import('components/NotFound') }
  ]
})

Vue.use(VueRouter)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
