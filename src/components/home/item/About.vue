<template>
  <div id="about">
    <nav-menu></nav-menu>
    <p>关于</p>
  </div>
</template>

<script>
  import NavMenu from '../NavMenu'

  export default {
    name: 'about',
    components: {
      "navMenu": NavMenu
    }
  }
</script>

<style scoped>
  #about {
    background: lightyellow;
    height: 600px;
    width: 100%;
  }
</style>
