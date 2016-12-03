<script>
export default { name: 'Index' }
</script>

<template>
  <main>
    <ul>
      <li>libs</li>
      <ol>
        <li>Vue</li>
        <li>Vue-router</li>
        <li>fastclick</li>
        <li>whatwg-fetch</li>
      </ol>
    </ul>
    <p><a href="/components">/components</a></p>
  </main>
</template>

<style lang="scss" scoped>
@import "~assets/scss/global";

html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 90%;
  font-size: size(24);
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
  a {
    color: #42b983;
    text-decoration: none;
  }
}
</style>
