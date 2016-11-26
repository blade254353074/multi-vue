<script>
export default {
  name: 'UiIndex'
}
</script>

<template>
  <div>
    <div class="page-hd">
      <h1 class="pui-page-title">Components</h1>
      <p class="pui-page-desc">组件</p>
    </div>
    <div class="page-bd">
      <p>Hello World!</p>
      <ul>
        <li><router-link to="buttons" append>Button 按钮</router-link></li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~assets/scss/global";

</style>
