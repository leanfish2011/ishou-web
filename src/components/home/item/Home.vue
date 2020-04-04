<template>
  <div id="home">
    <nav-header></nav-header>
    <div v-bind:style="{minHeight: Height+'px'}">
      <el-row :gutter="8">
        <label v-for="item in myDataList" :key="item.id">
          <el-col :span="4">
            <el-card shadow="hover" class="siteCard">
              <el-link :href="item.url" target="_blank">{{item.name}}</el-link>
              <p>{{item.remark}}</p>
            </el-card>
          </el-col>
        </label>
      </el-row>
    </div>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
  import NavHeader from '../NavHeader'
  import Service from '../../../config/service'
  import Footer from '../Footer'

  export default {
    name: 'home',
    components: {
      "navHeader": NavHeader,
      "bottomFooter": Footer,
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
    height: 100%;
    width: 100%;
    margin-top: 110px;
  }

  .siteCard {
    height: 80px;
  }
</style>
