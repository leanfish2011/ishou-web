<template>
  <div>
    <div>{{githubUser}}</div>
  </div>
</template>

<script>
  import Service from '../../../config/service'

  export default {
    name: "GithubLogin",
    data() {
      return {
        githubUser: "github登录中..."
      };
    },
    mounted() {
      let code = this.$route.query.code;
      console.log(code);
      this.$axios.get(Service.url.loginByGitHub + "?code=" + code).then((res) => {
        if (res.status === 200) {
          let responseData = res.data;
          if (responseData.code === 0) {
            this.logining = false;
            let userData = responseData.data;
            localStorage.setItem('userCode', userData.userCode);
            localStorage.setItem('userName', userData.name);
            localStorage.setItem('token', userData.token);
            localStorage.setItem('userId', userData.userId);

            this.$router.push({path: "/"});
          } else {
            this.logining = false;
            this.$message.error(responseData.msg);
          }
        } else {
          this.logining = false;
          this.$message.error("系统内部错误");
        }
      })
    }
  }
</script>

<style scoped>

</style>
