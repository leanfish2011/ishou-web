<template>
  <div id="app">
    <nav-menu></nav-menu>
    <router-view :class="'routerview'"></router-view>
  </div>
</template>

<script>
  import NavMenu from './components/home/NavMenu'

  export default {
    name: 'App',
    components: {
      "navMenu": NavMenu
    }
  }
</script>

<style>
  .routerview {
    margin: 10px 0 0 0;
  }
</style>
