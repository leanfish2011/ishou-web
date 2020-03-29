<template>
  <div id="about">
    <nav-menu></nav-menu>
    <div v-bind:style="{minHeight: Height+'px'}">
      <p>关于</p>
    </div>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
  import NavMenu from '../NavMenu'
  import Footer from '../Footer'

  export default {
    name: 'about',
    components: {
      "navMenu": NavMenu,
      "bottomFooter": Footer
    },
    data() {
      return {
        Height: 0
      }
    },
    mounted() {
      //动态设置内容高度 让footer始终居底   header+footer的高度是100
      this.Height = document.documentElement.clientHeight - 180;
      //监听浏览器窗口变化　
      window.onresize = () => {
        this.Height = document.documentElement.clientHeight - 180;
      }
    }
  }
</script>

<style scoped>
  #about {
    background: lightyellow;
    height: 100%;
    width: 100%;
  }
</style>
