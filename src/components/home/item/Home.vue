<template>
  <div id="home">
    <!--<nav-menu></nav-menu>-->
    <nav-header></nav-header>
    <div v-bind:style="{minHeight: Height+'px'}">
      <ul :class="'ulstyle'">
        <li v-for="item in myDataList" :key="item.id" :class="'listyle'">
          <a :href=item.url target="_blank">{{item.name}}</a>
        </li>
      </ul>
    </div>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
  import NavMenu from '../NavMenu'
  import Service from '../../../config/service'
  import Footer from '../Footer'
  import NavHeader from '../NavHeader'

  export default {
    name: 'home',
    components: {
      "navMenu": NavMenu,
      "bottomFooter": Footer,
      "navHeader": NavHeader
    },
    data() {
      return {
        myDataList: null,
        Height: 0
      }
    },
    created() {
      this.$axios.get(Service.url.home).then((res) => {
        this.myDataList = res.data.data;
      }).catch(function (error) {
        console.error(error);
      });
    },
    mounted() {
      //动态设置内容高度 让footer始终居底   header+footer的高度是100
      this.Height = document.documentElement.clientHeight - 160;
      //监听浏览器窗口变化　
      window.onresize = () => {
        this.Height = document.documentElement.clientHeight - 160;
      }
    }
  }
</script>

<style scoped>
  #home {
    background: gainsboro;
    height: 100%;
    width: 100%;
    margin-top: 110px;
  }

  .ulstyle {
    margin: 0;
    padding: 0;
  }

  .listyle {
    list-style-type: none;
    padding: 7px;
    background-color: #ffeecc;
    border-bottom: 1px solid white;
  }
</style>
