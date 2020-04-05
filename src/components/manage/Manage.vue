<template>
  <div class="app">
    <el-container>
      <el-aside class="app-side app-side-left"
                :class="isCollapse ? 'app-side-collapsed' : 'app-side-expanded'">
        <div class="app-side-logo">
          <img src="../../../static/img/log.jpg"
               :width="isCollapse ? '60' : '60'"
               height="60"/>
          <span class="logTitle">爱收藏</span>
        </div>
        <div>
          <el-menu default-active="/site"
                   class="el-menu-vertical-demo"
                   :collapse="isCollapse" :router="true">
            <label v-for="(item,index) in userMenu" :key="index">
              <label v-if="item.children.length>0">
                <label v-for="firstItem in item.children">
                  <el-submenu :index="firstItem.id">
                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span slot="title">{{firstItem.name}}</span>
                    </template>
                    <label v-for="child in firstItem.children">
                      <el-menu-item :index=child.url>{{child.name}}</el-menu-item>
                    </label>
                  </el-submenu>
                </label>
              </label>
            </label>
          </el-menu>
        </div>
      </el-aside>

      <el-container>
        <el-header>
          <div class="app-header-userinfo">
            <el-link href="/" type="primary" icon="el-icon-back">回到主页</el-link>
            <el-dropdown trigger="hover"
                         :hide-on-click="false">
              <span class="el-dropdown-link">
                {{ userName }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="changePwd">修改密码</el-dropdown-item>
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
    <change-pwd-dialog ref="changePwd"></change-pwd-dialog>
  </div>
</template>

<script>
  import Service from '../../config/service'
  import AuthUtil from '../../utils/authUtil'
  import ChangePwdDialog from './ChangePwdDialog'

  export default {
    name: 'Container',
    components: {
      "changePwdDialog": ChangePwdDialog
    },
    data() {
      return {
        userName: '',
        isCollapse: false,
        userMenu: null
      }
    },
    methods: {
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
      },
      changePwd() {
        this.$refs.changePwd.dialogFormVisible = true;
      }
    },
    mounted() {
      let userName = localStorage.getItem('userName');
      this.userName = userName;
    },
    created() {
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
    text-align: right;
    font-size: 12px;
  }

  .logTitle {
    font-size: 25px;
    color: #E33E06;
    width: 6%;
  }
</style>
