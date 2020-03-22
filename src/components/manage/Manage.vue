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
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">网站管理</span>
              </template>
              <el-menu-item index="/site">我的网站</el-menu-item>
              <el-menu-item index="/type">类别管理</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span slot="title">用户管理</span>
              </template>
              <el-menu-item index="/user">用户管理</el-menu-item>
              <el-menu-item index="role">角色管理</el-menu-item>
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

  export default {
    name: 'Container',
    data() {
      return {
        userName: '',
        isCollapse: false
      }
    },
    methods: {
      logout: function () {
        this.$confirm('确认退出?', '提示', {})
        .then(() => {
          //调用接口
          this.$axios.get(Service.url.logout, {
            headers: {
              'Authorization': sessionStorage.getItem('token')
            }
          }).then((res) => {
            let responseData = res.data;
            if (responseData.code === 0) {
              sessionStorage.removeItem('userCode');
              sessionStorage.removeItem('userName');
              sessionStorage.removeItem('token');
              this.userName = '';

              this.$router.push('/login');
            } else {
              this.$message.error(responseData.msg);
            }
          }).catch(function (error) {
            console.error(error);
          });
        })
      }
    },
    mounted: function () {
      let userName = sessionStorage.getItem('userName');
      this.userName = userName;
    },
    created: function () {
      let token = sessionStorage.getItem('token');
      if (token == '' || token == null) {
        this.$router.push('/login');
      }
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
