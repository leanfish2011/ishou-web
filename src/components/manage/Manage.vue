<template>
  <div class="mange">
    <el-container class="manageContent">
      <el-header class="manageHeader">
        <manage-header></manage-header>
      </el-header>

      <el-container>
        <el-aside>
          <manage-aside></manage-aside>
        </el-aside>

        <el-container>
          <el-main>
            <router-view/>
          </el-main>
          <el-footer>
            <manage-footer></manage-footer>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Service from '../../config/service'
  import AuthUtil from '../../utils/authUtil'
  import ManageHeader from './Header'
  import ManageAside from './Aside'
  import ManageFooter from './ManageFooter'

  export default {
    name: 'Manage',
    components: {
      "manageFooter": ManageFooter,
      "manageHeader": ManageHeader,
      "manageAside": ManageAside,
    },
    methods: {
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
    },
    created() {
      this.authCheck();
    }
  }
</script>

<style>
  .mange {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .manageHeader {
    background-color: #13d1aa;
    color: #8b8626;
    line-height: 60px;
    font-size: 12px;
  }

  .manageContent {
    height: 100vh;
  }

</style>
