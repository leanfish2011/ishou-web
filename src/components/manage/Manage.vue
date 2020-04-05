<template>
  <div>
    <el-container>
      <el-header>
        <div class="header_log">
          <img src="../../../static/img/log.jpg"/>
          <span class="logTitle">爱收藏</span>
        </div>
        <div class="header_user">
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

      <el-container>
        <el-aside>
          <div class="asideMenu">
            <el-menu background-color="#324157"
                     text-color="#bfcbd9" active-text-color="#20a0ff" default-active="/site"
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
          <el-main>
            <template>
              <router-view/>
            </template>
          </el-main>
          <el-footer>
            <manage-footer></manage-footer>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
    <change-pwd-dialog ref="changePwd"></change-pwd-dialog>
  </div>
</template>

<script>
  import Service from '../../config/service'
  import AuthUtil from '../../utils/authUtil'
  import ChangePwdDialog from './ChangePwdDialog'
  import ManageFooter from './ManageFooter'

  export default {
    name: 'Container',
    components: {
      "changePwdDialog": ChangePwdDialog,
      "manageFooter": ManageFooter
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
    font-size: 12px;
  }

  .header_log {
    float: left;
    width: 250px;
    line-height: 70px;
  }

  .header_user {
    float: right;
  }

  .asideMenu {
    height: 100%;
  }

  .logTitle {
    font-size: 25px;
    color: #E33E06;
    width: 6%;
  }
</style>
