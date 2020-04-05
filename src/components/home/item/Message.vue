<template>
  <div id="message">
    <nav-header></nav-header>
    <div class="aboutContent">
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
      "navHeader": NavHeader,
      "bottomFooter": Footer,
    }
  }
</script>

<style scoped>
  #message {
    background: darkslategrey;
    width: 100%;
    margin-top: 110px;
  }

  .aboutContent {
    margin-top: 5px;
    text-align: center;
    min-height: calc(100vh - 176px);
  }
</style>
