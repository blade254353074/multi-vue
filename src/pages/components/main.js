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

window.fetch('http://example.com/', { mode: 'no-cors' })
  .then(_ => { console.log('GET http://example.com/') })
  .catch(err => console.error(err))
