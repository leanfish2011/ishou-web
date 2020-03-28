<template>
  <div class="app">
    <el-container>
      <el-aside class="app-side app-side-left"
                :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
        <div class="app-side-logo">
          <img src="@/assets/logo.png"
               :width="isCollapse ? '60' : '60'"
               height="60"/>
        </div>
        <div>
          <el-menu default-active="/site"
                   class="el-menu-vertical-demo"
                   :collapse="isCollapse" :router="true">
            <label v-for="(item,index) in userMenu" :key="index">
              <el-menu-item :index=item.url>
                <i :class=item.icon></i>
                <span slot="title">{{item.name}}</span>
              </el-menu-item>
            </label>

            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">网站管理</span>
              </template>
              <el-menu-item index="/site">我的网站</el-menu-item>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span slot="title">用户管理</span>
              </template>
              <el-menu-item index="/user">用户管理</el-menu-item>
              <el-menu-item index="/role">角色管理</el-menu-item>
            </el-submenu>

          </el-menu>
        </div>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <div class="app-header-userinfo">
            <router-link to="/">主页</router-link>
            <el-dropdown trigger="hover"
                         :hide-on-click="false">
              <span class="el-dropdown-link">
                {{ userName }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>我的消息</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item divided
                                  @click.native="logout">退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>

        <el-main class="app-body">
          <template>
            <router-view/>
          </template>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Service from '../../config/service'
  import AuthUtil from '../../utils/authUtil'

  export default {
    name: 'Container',
    data() {
      return {
        userName: '',
        isCollapse: false,
        userMenu: null
      }
    },
    methods: {
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

              this.$router.push('/login');
            } else {
              this.$message.error(responseData.msg);
            }
          }).catch(function (error) {
            console.error(error);
          });
        })
      },
      authCheck() {
        this.$axios.get(Service.url.authCheck, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            let code = responseData.code;
            if (code === -1 || code === -2) {
              this.$message.error(responseData.msg);
              AuthUtil.clearSession();

              this.$router.push('/login');
            }
          } else {
            this.$message.error("系统内部错误");
          }
        }).catch(function (error) {
          console.error(error);
        });
      },
      loadUserMenu() {
        this.$axios.get(Service.url.menuUser + "/" + localStorage.getItem('userId'), {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            if (responseData.code === 0) {
              this.userMenu = responseData.data;
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
      }
    },
    mounted: function () {
      let userName = localStorage.getItem('userName');
      this.userName = userName;
    },
    created: function () {
      this.authCheck();
      this.loadUserMenu();
    }
  }
</script>

<style>
  .el-header {
    background-color: #13d1aa;
    color: #8b8626;
    line-height: 60px;
  }
</style>
