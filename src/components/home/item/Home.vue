<template>
  <div id="home">
    <nav-header></nav-header>
    <div class="homeContent">
      <label v-for="item in myDataList" :key="item.id">
        <el-card shadow="hover" class="siteCard">
          <el-row>
            <el-col :span="2">
              <a :href=item.url target="_blank">
                <img class="siteIcon" :src="queryIcon(item.iconUrl)"/>
              </a>
            </el-col>
            <el-col :span="22">
              <el-link :href="item.url" target="_blank" class="el-link">{{item.name}}
              </el-link>
              <div class="remark">{{item.remark}}</div>
            </el-col>
          </el-row>
        </el-card>
      </label>
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
      this.$axios.get(Service.siteUrl.home).then((res) => {
        if (res.status === 200) {
          this.myDataList = res.data.data.list;
        } else {
          this.$message.error("系统内部错误");
        }
      }).catch(function (error) {
        console.error(error);
      });
    },
    methods: {
      queryIcon(url) {
        if (url == null || url == "") {
          return "../../../../static/ishou.ico";
        }

        return url;
      }
    }
  }
</script>

<style scoped>
  #home {
    width: 100%;
    margin-top: 120px;
  }

  .homeContent {
    width: 50%;
    min-height: calc(100vh - 176px);
    margin: 5px auto 5px auto;
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

  .el-link{
    font-size: 16px;
  }

  a:link, a:visited {
    text-decoration: none;
    color: #2f65ca
  }

  /* 已访问的链接 */
  a:hover {
    color: #5c31ff
  }
</style>
