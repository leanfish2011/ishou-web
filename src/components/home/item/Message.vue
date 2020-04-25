<template>
  <div id="message">
    <nav-header></nav-header>
    <div class="aboutContent">
      <h3>留言</h3>
      <utterances-mes :id="1"></utterances-mes>
    </div>
    <bottom-footer></bottom-footer>
  </div>

</template>

<script>
  import NavHeader from '../NavHeader'
  import Utterances from './Utterances'
  import Footer from '../Footer'

  export default {
    name: "Message",
    components: {
      "navHeader": NavHeader,
      "bottomFooter": Footer,
      "utterancesMes": Utterances
    }
  }
</script>

<style scoped>
  #message {
    width: 100%;
    margin-top: 110px;
  }

  .aboutContent {
    margin-top: 5px;
    text-align: center;
    min-height: calc(100vh - 176px);
  }
</style>
