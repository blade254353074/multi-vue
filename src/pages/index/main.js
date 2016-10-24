// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

System.import('./App').then(App => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    render: h => h(App.default)
  })
}).catch(err => {
  console.error(err)
})
