<template>
  <div>
    <div id="topMenu">
      <div id="top">
        <div id="log">
          <img src="../../../static/img/log.jpg">
        </div>
        <div id="logTitle">
          爱收藏
        </div>
        <div id="midSearch">
          <form ref="baiduSearch" action="http://www.baidu.com/s" method="GET" target="_blank">
            <input type="text" name="wd" id="txtKeyword"/>
            <el-button type="primary" plain size="medium" @click="searchKeyword()">百度一下</el-button>
            <input type="hidden" name="ie" value="utf-8"/>
            <input type="hidden" name="tn" value="ace"/>
          </form>
        </div>
        <div id="userInfo">
          <el-row>
            <el-button v-if="userName==''||userName==null" size="mini" type="primary"
                       @click="openLogin()">登录
            </el-button>
            <el-dropdown v-else size="mini" split-button>
              <label @click="openMange()">{{ userName }}</label>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-circle-plus-outline" @click.native="addSite()">增加收藏
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-switch-button" @click.native="logout()">退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button size="mini" type="primary" @click="openRegister()">注册</el-button>
          </el-row>
        </div>
      </div>
      <div id="divMenu">
        <ul>
          <label v-for="item in menuData">
            <label v-if="showMenu(item.needLogin)">
              <li>
                <router-link :to=item.route exact>{{item.name}}</router-link>
              </li>
            </label>
          </label>
        </ul>
      </div>
    </div>
    <fast-add-site-dialog ref="fastAddSite"></fast-add-site-dialog>
  </div>
</template>

<script>
  import Service from '../../config/service'
  import AuthUtil from '../../utils/authUtil'
  import FastAddSiteDialog from './FastAddSiteDialog'

  export default {
    name: "NavHeader",
    components: {
      "fastAddSiteDialog": FastAddSiteDialog
    },
    data() {
      return {
        userName: '',
        activeId: "1",
        menuData: [
          {
            "id": "1",
            "name": "主页",
            "route": "/",
            "needLogin": false
          },
          {
            "id": "2",
            "name": "我的",
            "route": "/my",
            "needLogin": true
          },
          // {
          //   "id": "3",
          //   "name": "留言",
          //   "route": "/message",
          //   "needLogin": false
          // },
          {
            "id": "4",
            "name": "关于",
            "route": "/about",
            "needLogin": false
          }
        ]
      }
    },
    methods: {
      searchKeyword() {
        this.$refs.baiduSearch.submit();
      },
      logout() {
        this.$confirm('确认退出?', '提示', {})
        .then(() => {
          //调用接口
          this.$axios.get(Service.url.logout, {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          }).then((res) => {
            let responseData = res.data;
            if (responseData.code === 0) {
              AuthUtil.clearSession();
              this.userName = '';

              this.$router.push('/');
            } else {
              this.$message.error(responseData.msg);
            }
          }).catch(function (error) {
            console.error(error);
          });
        })
      },
      addSite() {
        this.$refs.fastAddSite.dialogFormVisible = true;
      },
      showMenu(needLogin) {
        if (needLogin == false) {
          return true;
        }

        if (this.userName == null || this.userName == '') {
          return false;
        }

        return true;
      },
      openLogin() {
        this.$router.push('/login');
      },
      openRegister() {
        this.$router.push('/register');
      },
      openMange() {
        this.$router.push('/site');
      }
    },
    mounted() {
      let userName = localStorage.getItem('userName');
      this.userName = userName;
    }
  }
</script>

<style scoped>
  #topMenu {
    width: 100%;
    top: 0;
    background: white;
    z-index: 100;
    margin: 0 auto 0 auto;
    position: fixed;
  }

  #top {
    border: 1px solid #D8DFEA;
    margin: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #log {
    width: 4%;
  }

  #logTitle {
    font-size: 25px;
    color: #E33E06;
    width: 6%;
  }

  #midSearch {
    width: 80%;
    margin-left: 50px;
  }

  #midSearch input {
    width: 400px;
    height: 30px;
    font-size: 15px;
    border: 1px solid #4791FF;
  }

  #userInfo {
    width: 10%;
    text-align: right;
    margin-right: 10px;
  }

  #divMenu {
    line-height: 30px;
    height: 30px;
    top: 0px;
    background: #1BA1E2;
    margin-left: 5px;
    margin-right: 5px;
    z-index: 100;
  }

  #divMenu ul {
    list-style: none;
    line-height: 30px;
    margin: 0 auto 0 auto;
  }

  #divMenu ul li {
    display: block;
    float: left;
  }

  #divMenu ul li a {
    text-decoration: none;
    color: #fff;
    display: block;
    padding-left: 20px;
    padding-right: 20px;
  }

  #divMenu ul li:hover {
    background: #52BFF5;
  }

  /*路由激活样式，router自带属性*/
  .router-link-active {
    background-color: #e70;
    color: #fff;
  }
</style>
