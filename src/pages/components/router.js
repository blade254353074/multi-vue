import VueRouter from 'vue-router'
import Index from './views/Index'
import Buttons from './views/Buttons'

const { origin } = window.location
const isGithub = origin.indexOf('github.io') > -1

const router = new VueRouter({
  mode: isGithub ? 'hash' : 'history',
  base: '/components',
  routes: [
    { path: '/', component: Index },
    { path: '/buttons', component: Buttons },
    { path: '*', component: () => System.import('components/NotFound') }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      // savedPosition is only available for popstate navigations.
      return savedPosition
    } else {
      const position = {}
      // new navigation.
      // scroll to anchor by returning the selector
      if (to.hash) {
        position.selector = to.hash
      }
      // check if any matched route config has meta that requires scrolling to top
      if (to.matched.some(m => m.meta.scrollToTop)) {
        // cords will be used if no selector is provided,
        // or if the selector didn't match any element.
        position.x = 0
        position.y = 0
      }
      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      return position
    }
  }
})

export default router
