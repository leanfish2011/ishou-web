<template>
  <div id="message">
    <nav-header></nav-header>
    <div v-bind:style="{minHeight: Height+'px'}" class="aboutMain">
    留言
    </div>
    <bottom-footer></bottom-footer>
  </div>

</template>

<script>
  import NavHeader from '../NavHeader'
  import Footer from '../Footer'

  export default {
    name: "Message",
    components: {
      "bottomFooter": Footer,
      "navHeader": NavHeader
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
  #message{
    background: darkslategrey;
    height: 100%;
    width: 100%;
    margin-top: 110px;
  }

  #aboutMain {
    margin-top: 5px;
    text-align: center;
  }
</style>
