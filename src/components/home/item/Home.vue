<template>
  <div id="home">
    <nav-header></nav-header>
    <div class="homeContent">
      <el-row :gutter="8">
        <label v-for="item in myDataList" :key="item.id">
          <el-col :span="4">
            <el-card shadow="hover" class="siteCard">
              <el-row>
                <el-col :span="6">
                  <a :href=item.url target="_blank">
                    <img class="siteIcon" :src="queryIcon(item.url)"/>
                  </a>
                </el-col>
                <el-col :span="18">
                  <el-link :href="item.url" target="_blank">{{item.name}}</el-link>
                  <div class="remark">{{item.remark}}</div>
                </el-col>
              </el-row>
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
      "bottomFooter": Footer
    },
    data() {
      return {
        myDataList: null
      }
    },
    created() {
      this.$axios.get(Service.url.home).then((res) => {
        this.myDataList = res.data.data;
      }).catch(function (error) {
        console.error(error);
      });
    },
    methods: {
      queryIcon(url) {
        let reg = /((https?|http|ftp|file):\/\/)?[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+\.[-A-Za-z+]+\/+/g;
        return url.match(reg) + "/favicon.ico";
      }
    }
  }
</script>

<style scoped>
  #home {
    width: 100%;
    margin-top: 110px;
  }

  .homeContent {
    width: 99%;
    min-height: calc(100vh - 176px);
    margin-left: 10px;
  }

  .siteCard {
    height: 80px;
  }

  .siteIcon {
    width: 50%;
    height: 50%;
  }

  .remark {
    font-size: 14px;
  }
</style>
