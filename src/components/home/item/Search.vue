<template>
  <div id="search">
    <search-header @search="onSearch"></search-header>
    <div class="searchContent">
      <el-row :gutter="8">
        <label v-for="item in myDataList" :key="item.id">
          <el-col :span="4">
            <el-card shadow="hover" class="siteCard">
              <el-row>
                <el-col :span="6">
                  <a :href=item.url target="_blank">
                    <img class="siteIcon" :src="queryIcon(item.url)"
                         onerror="this.src='../../../../static/ishou.ico'"/>
                  </a>
                </el-col>
                <el-col :span="18">
                  <el-link :href="item.url" target="_blank" style="font-size: 16px;">{{item.name}}
                  </el-link>
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
  import SearchHeader from '../SearchHeader'
  import Service from '../../../config/service'
  import Footer from '../Footer'

  export default {
    name: 'search',
    components: {
      "SearchHeader": SearchHeader,
      "bottomFooter": Footer
    },
    data() {
      return {
        myDataList: null,
        searchForm: {
          keyword: ''
        }
      }
    },
    created() {
      //从url中获取参数
      let keyword = this.$route.query.keyword;
      //给搜索赋值

      this.onSearch(keyword);
    },
    methods: {
      queryIcon(url) {
        let reg = /((https?|http|ftp|file):\/\/)?[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+\.[-A-Za-z+]+\/+/g;
        return url.match(reg) + "favicon.ico";
      },
      onSearch(keyword) {
        this.searchForm.keyword = keyword;
        this.$axios.get(Service.url.search, {
          params: this.searchForm
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            if (responseData.code === 0) {
              this.myDataList = responseData.data;
            } else {
              this.$message.error(responseData.msg);
            }
          } else {
            this.$message.error("系统内部错误");
          }
        }).catch(function (error) {
          console.error(error);
        });
      }
    }
  }
</script>

<style scoped>
  #search {
    width: 100%;
    margin-top: 70px;
  }

  .searchContent {
    width: 99%;
    min-height: calc(100vh - 136px);
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
