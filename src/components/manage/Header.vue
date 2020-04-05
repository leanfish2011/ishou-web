<template>
  <div>
    <div class="manageHeader">
      <div class="headerLogo">
        <img src="../../../static/img/log.jpg"/>
        <span class="logoTitle">爱收藏</span>
      </div>
      <div class="headerUser">
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
      changePwd() {
        this.$refs.changePwd.dialogFormVisible = true;
      }
    },
    mounted() {
      let userName = localStorage.getItem('userName');
      this.userName = userName;
    }
  }
</script>

<style scoped>
  .headerLogo {
    float: left;
  }

  .logoTitle {
    font-size: 25px;
    color: #E33E06;
  }

  .headerUser {
    float: right;
  }
</style>
