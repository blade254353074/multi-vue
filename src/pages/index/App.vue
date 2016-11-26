<script>
export default { name: 'App' }
</script>

<template>
  <div id="app">
    <div class="page">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>
