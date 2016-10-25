// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
Promise.all([
  System.import('vue'),
  System.import('./App')
])
  .then(([Vue, App]) => {
    /* eslint-disable no-new */
    console.log(App)
    new Vue({
      el: '#app',
      render: h => h(App)
    })
  })
  .catch(console.error)
