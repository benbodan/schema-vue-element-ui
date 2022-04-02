<template>
  <div id="app">
    <grid-components/>
  </div>
</template>

<script>

import GridComponents from '@/examples/GridComponents.vue'
export default {
  name: 'App',
  components: {
    GridComponents
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
