<template>
  <div id="app">
    <nav-menu></nav-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import NavMenu from './components/home/NavMenu'

export default {
  name: 'App',
  components:{
    "navMenu":NavMenu
  }
}
</script>

<style>

</style>
