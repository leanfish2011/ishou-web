<template>
  <div id="app">
    <navHeader></navHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import NavHeader from './components/home/NavHeader'
export default {
  name: 'App',
  components:{
    "navHeader":NavHeader
  }
}
</script>

<style>

</style>
