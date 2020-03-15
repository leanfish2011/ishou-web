<template>
  <div id="hot">
    <nav-menu></nav-menu>
    <p>热点收藏</p>
  </div>
</template>

<script>
  import NavMenu from '../NavMenu'

  export default {
    name: 'hot',
    components: {
      "navMenu": NavMenu
    }
  }
</script>

<style scoped>
#hot{
	background: bisque;
	height: 600px;
	width: 100%;
}
</style>
