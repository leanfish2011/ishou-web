<template>
  <div id="message">
    <nav-header></nav-header>
    <div class="aboutContent">
      <h4>你的建议，是我们前进最大的动力</h4>
      <el-tabs>
        <el-tab-pane label="网站账号留言">
          <mes-board></mes-board>
        </el-tab-pane>
        <el-tab-pane label="github账号留言">
          <utterances-mes :id="1"></utterances-mes>
        </el-tab-pane>
      </el-tabs>
    </div>
    <bottom-footer></bottom-footer>
  </div>

</template>

<script>
  import NavHeader from '../NavHeader'
  import MesBoard from './mesitem/MesBoard'
  import Utterances from './mesitem/Utterances'
  import Footer from '../Footer'

  export default {
    name: "Message",
    components: {
      "navHeader": NavHeader,
      "bottomFooter": Footer,
      "mesBoard": MesBoard,
      "utterancesMes": Utterances
    }
  }
</script>

<style scoped>
  #message {
    width: 100%;
    margin-top: 120px;
  }

  .aboutContent {
    min-height: calc(100vh - 186px);
    width: 50%;
    margin: 5px auto 5px auto;
  }
</style>
