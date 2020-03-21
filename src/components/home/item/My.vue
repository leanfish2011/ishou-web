<template>
  <div id="my">
    <nav-menu></nav-menu>
    <p>我的收藏</p>
  </div>
</template>

<script>
  import NavMenu from '../NavMenu'

  export default {
    name: 'my',
    components: {
      "navMenu": NavMenu
    }
  }
</script>

<style scoped>
#my{
	background: bisque;
	height: 600px;
	width: 100%;
}
</style>
