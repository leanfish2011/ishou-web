<template>
  <div id="topMenu">
    <div id="top">
      <table width="100%">
        <tr>
          <td>
            <img src="../../../static/img/log.jpg">
          </td>
          <td>
            <div id="logTitle">
              爱收藏
            </div>
          </td>
          <td>
            <div id="midSearch">
              <input type="text" id="txtKeyword"/>
              <span><a id="btnSearch" href="#" @click="searchKeyword()">搜索一下</a></span>
            </div>
          </td>
          <td style="text-align: right">
            <el-link>
              <router-link v-if="userName==''||userName==null" to="/login">登录</router-link>
              <el-dropdown v-else trigger="hover" :hide-on-click="false">
              <span class="el-dropdown-link">
                <router-link to="/site"> {{ userName }}</router-link>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="addSite">增加收藏</el-dropdown-item>
                  <el-dropdown-item divided
                                    @click.native="logout">退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-link>
            <el-link>
              <router-link to="/register">注册</router-link>
            </el-link>
            <fast-add-site-dialog ref="fastAddSite"></fast-add-site-dialog>
          </td>
        </tr>
      </table>
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
          {
            "id": "3",
            "name": "留言",
            "route": "/message",
            "needLogin": false
          },
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
        this.$message("待实现……");
      },
      logout: function () {
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
      addSite: function () {
        this.$refs.fastAddSite.dialogFormVisible = true;
      },
      showMenu: function (needLogin) {
        if (needLogin == false) {
          return true;
        }

        if (this.userName == null || this.userName == '') {
          return false;
        }

        return true;
      }
    },
    mounted: function () {
      let userName = localStorage.getItem('userName');
      this.userName = userName;
    }
  }
</script>

<style scoped>
  #topMenu {
    width: 100%;
    top: 0px;
    background: white;
    z-index: 100;
    margin: 0 auto 0 auto;
    position: fixed;
  }

  #top {
    border: 1px solid #D8DFEA;
    margin: 5px;
  }

  #midSearch {
    width: 700px;
    margin-left: 50px;
  }

  #midSearch input {
    width: 400px;
    height: 30px;
    font-size: 15px;
    border: 1px solid #4791FF;
  }

  #midSearch span a {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 8px;
    padding-bottom: 7px;
    background: #3385FF;
    color: white;
    text-decoration: none;
  }

  #logTitle {
    font-size: 25px;
    color: #E33E06;
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
