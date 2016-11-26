import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import './app.scss'
import Index from './views/Index'

const router = new VueRouter({
  mode: 'history',
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
