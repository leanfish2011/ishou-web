<template>
  <div class="mes-container">
    <el-form ref="mesForm" :model="mesModel" label-width="80px" :rules="validRule"
             status-icon
             class="mes-page">
      <el-form-item label="评论" prop="content">
        <el-input type="textarea" v-model="mesModel.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-if="showLogin()" type="primary" size="medium" @click="openLogin">登录发表评论</el-button>
        <el-button v-else type="primary" size="medium" @click="onSubmit" :loading="mesing">评论</el-button>
      </el-form-item>
      <mes-board-list></mes-board-list>
    </el-form>
  </div>
</template>

<script>
  import Service from '../../../../config/service'
  import AuthUtil from '../../../../utils/authUtil'
  import MesBoardList from './MesBoardList'

  export default {
    name: "Mesbox",
    components: {
      "mesBoardList": MesBoardList
    },
    data() {
      return {
        userName: '',
        mesing: false,
        mesModel: {
          content: '',
          parentId: null
        },
        validRule: {
          content: [
            {required: true, message: '请输入评论内容', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault();
        this.$refs.mesForm.validate((valid) => {
          if (valid) {
            this.mesing = true;
            this.$axios.post(Service.url.message, this.mesModel,
              {
                headers: {
                  'Authorization': localStorage.getItem('token')
                }
              }).then(
              (res) => {
                if (res.status === 200) {
                  let responseData = res.data;
                  if (responseData.code === 0) {
                    this.mesing = false;
                    this.$message({
                      message: responseData.msg,
                      type: 'success'
                    });

                    this.$refs.mesForm.resetFields();
                  } else {
                    this.mesing = false;
                    this.$message.error(responseData.msg);
                  }
                } else {
                  this.mesing = false;
                  this.$message.error("系统内部错误");
                }
              })
          }
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
              AuthUtil.clearSession();
            } else {
              let userName = localStorage.getItem('userName');
              this.userName = userName;
            }
          } else {
            this.$message.error("系统内部错误");
          }
        }).catch(function (error) {
          console.error(error);
        });
      },
      openLogin() {
        this.$router.push('/login');
      },
      showLogin() {
        if (this.userName == null || this.userName == '') {
          return true;
        }

        return false;
      },
    },
    mounted() {
      this.authCheck();
    }
  }
</script>

<style scoped>

</style>
