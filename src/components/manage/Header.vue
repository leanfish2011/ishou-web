<template>
  <div>
    <div class="manageHeader">
      <div class="headerLogo">
        <el-row>
          <el-col :span="2">
            <img width="50" height="50" src="../../../static/img/pen.png"/>
          </el-col>
          <el-col :span="22">
            <span class="logoTitle">爱收藏-后台管理</span>
          </el-col>
        </el-row>
      </div>
      <div class="headerUser">
        <el-link href="/" type="primary" icon="el-icon-back">回到首页</el-link>
        <el-avatar :size="40" ref="photourlAvatar"
                   :src=userPhotoUrl></el-avatar>
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
    </div>
    <change-pwd-dialog ref="changePwd"></change-pwd-dialog>
  </div>
</template>

<script>
  import Service from '../../config/service'
  import AuthUtil from '../../utils/authUtil'
  import ChangePwdDialog from './ChangePwdDialog'

  export default {
    name: "Header",
    components: {
      "changePwdDialog": ChangePwdDialog,
    },
    data() {
      return {
        userName: '',
        userPhotoUrl: '',
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
            AuthUtil.clearSession();
            this.userName = '';
            this.userPhotoUrl = '';
            this.$router.push('/login');
          }).catch(function (error) {
            console.error(error);
          });
        })
      },
      changePwd() {
        this.$refs.changePwd.dialogFormVisible = true;
      }
    },
    mounted() {
      this.userName = localStorage.getItem('userName');
      this.userPhotoUrl = localStorage.getItem('photourl');
    }
  }
</script>

<style scoped>
  .headerLogo {
    float: left;
    width: 50%;
  }

  .logoTitle {
    font-size: 25px;
    color: #e37d57;
  }

  .headerUser {
    float: right;
  }

  .el-dropdown-link {
    color: #e3e0db;
  }
</style>
