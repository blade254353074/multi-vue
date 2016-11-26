<script>
export default { name: 'NotFound' }
</script>

<template>
  <div class="ui-notfound">
    <h1>404</h1>
    <div class="ui-notfound-detail">
      <h2>你似乎来到了封建时代...</h2>
      <p>来源链接是否正确？</p>
      <hr>
      <p>
        <router-link to="/">返回首页</router-link> 或者
        <a href="javascript:history.go(-1)">返回上页</a>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~assets/scss/global";

.ui-notfound {
  margin: size(120) size(16);
  h1 {
    margin-left: size(8);
    margin-bottom: size(8);
    font-size: size(24);
    color: $gray-title;
  }
}

.ui-notfound-detail {
  padding: size(24);
  border: 1px solid $gray-border;
  background-color: #fff;
  text-align: center;
  border-radius: size(8);
  h2 {
    margin-bottom: size(20);
    font-size: size(15);
    color: $gray-title;
  }
  hr {
    margin: size(20) 0;
  }
}
</style>
