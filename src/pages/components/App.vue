<script>
export default {
  name: 'App',
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').filter(path => path.length).length
      const fromDepth = from.path.split('/').filter(path => path.length).length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<template>
  <main id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="page"></router-view>
      </keep-alive>
    </transition>
  </main>
</template>
