<script>
import { UiButton } from 'components/ui'

export default {
  name: 'UiButtons',
  components: { UiButton }
}
</script>

<template>
  <div>
    <div class="page-hd">
      <h1 class="pui-page-title">Button</h1>
      <p class="pui-page-desc">按钮</p>
    </div>
    <div class="page-bd">
      <p><UiButton>default</UiButton></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~assets/scss/global";

</style>
