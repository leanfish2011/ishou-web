<template>
  <div class="register-container">
    <el-link>
      <router-link to="/" target="_blank">回到首页</router-link>
    </el-link>
    <el-form ref="registerForm" :model="registerModel" label-width="80px" :rules="validRule"
             status-icon
             class="register-page">
      <h3 class="title">注册</h3>
      <el-form-item label="用户名" prop="usercode">
        <el-input v-model="registerModel.usercode" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerModel.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="registerModel.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerModel.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="registering">注册</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "register",
    data() {
      return {
        registering: false,
        registerModel: {
          usercode: '',
          password: '123456',
          name: '',
          email: ''
        },
        validRule: {
          usercode: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}],
          name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          ]
        }
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault();
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            this.registering = true;
            let registerData = JSON.stringify(this.registerModel);
            this.$axios.post('http://127.0.0.1:9092/api/v1/auth/register', registerData).then(
              (res) => {
                if (res.status === 200) {
                  let responseData = res.data;
                  if (responseData.code === 0) {
                    this.registering = false;
                    this.$message({
                      message: responseData.msg,
                      type: 'success'
                    });
                  } else {
                    this.registering = false;
                    this.$message.error(responseData.msg);
                  }
                } else {
                  this.registering = false;
                  this.$message.error("系统内部错误");
                }
              })
          }
        })
      },
      onCancel() {
        this.$refs.registerForm.resetFields();
      }
    }
  }
</script>

<style scoped>
  .register-container {
    width: 100%;
    height: 100%;
  }

  .register-page {
    width: 600px;
    margin: 10px auto;
  }
</style>
