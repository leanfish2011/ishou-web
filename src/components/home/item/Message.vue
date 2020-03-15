<template>
  <div id="message">
    <nav-menu></nav-menu>
    <p>留言板</p>
  </div>
</template>

<script>
  import NavMenu from '../NavMenu'

  export default {
    name: 'message',
    components: {
      "navMenu": NavMenu
    }
  }
</script>

<style scoped>
  #message {
    background: azure;
    height: 600px;
    width: 100%;
  }
</style>
