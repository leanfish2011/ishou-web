<template>
  <div id="my">
    <nav-header></nav-header>
    <div class="myContent">
      <el-timeline reverse style="width: 20%">
        <el-timeline-item
          v-for="(item, index) in myDataList"
          :timestamp="dateFormat(item.createTime)"
          :key="index"
          type="primary"
          color="#0bbd87"
          size="large" placement="top">
          <el-card class="siteCard">
            <el-row>
              <el-col :span="6">
                <a :href=item.url target="_blank">
                  <img class="siteIcon" :src="queryIcon(item.url)"
                       onerror="this.src='../../../../static/ishou.ico'"/>
                </a>
              </el-col>
              <el-col :span="18">
                <el-link :href="item.url" target="_blank">{{item.name}}</el-link>
                <p>{{item.remark}}</p>
                <p>{{item.tag}}</p>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
  import NavHeader from '../NavHeader'
  import Footer from '../Footer'
  import Service from '../../../config/service'
  import AuthUtil from '../../../utils/authUtil'
  import DateUtil from '../../../utils/dateUtil'

  export default {
    name: 'my',
    components: {
      "navHeader": NavHeader,
      "bottomFooter": Footer,
    },
    data() {
      return {
        myDataList: null
      }
    },
    methods: {
      load() {
        this.$axios.get(Service.url.sitePersonal, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            if (responseData.code === 0) {
              this.myDataList = responseData.data;
            } else {
              this.$message.error(responseData.msg);
              if (responseData.code === -2) {
                AuthUtil.clearSession();

                this.$router.push('/login');
              }
            }
          } else {
            this.$message.error("系统内部错误");
          }
        }).catch(function (error) {
          console.error(error);
        });
      },
      dateFormat(createTimeStamp) {
        return DateUtil.dateFormat(createTimeStamp);
      },
      queryIcon(url) {
        let reg = /((https?|http|ftp|file):\/\/)?[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+\.[-A-Za-z+]+\/+/g;
        return url.match(reg) + "favicon.ico";
      }
    },
    created() {
      this.load();
    }
  }
</script>

<style scoped>
  #my {
    width: 100%;
    margin-top: 110px;
  }

  .myContent {
    min-height: calc(100vh - 176px);
  }

  .siteCard {
    height: 80px;
  }

  .siteIcon {
    width: 50%;
    height: 50%;
  }
</style>
