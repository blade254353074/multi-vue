import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import './app.scss'
import Index from './views/Index'

const { origin, pathname } = window.location
const base = origin.indexOf('github.io') > -1
  ? pathname.split('/').slice(0, 2).join('/')
  : '/'

const router = new VueRouter({
  mode: 'history',
  base,
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
