<template>
  <div class="sub-container">
    <el-form ref="subForm" :model="subModel" label-width="80px" :rules="validRule"
             status-icon
             class="sub-page">
      <p>「爱收藏-每周经典网站」，是爱收藏网站推出的免费订阅服务，旨在为不愿错过好网站的你，推荐每周最新的网站收藏。</p>
      <h3 class="title">订阅</h3>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="subModel.email" placeholder="请输入邮箱地址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="subing">立即订阅</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Service from '../../config/service'

  export default {
    name: "Subscribe",
    data() {
      return {
        subing: false,
        subModel: {
          email: ''
        },
        validRule: {
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
        this.$refs.subForm.validate((valid) => {
          if (valid) {
            this.subing = true;
            //校验是否已经订阅过
            this.$axios.post(Service.url.subExist, this.subModel).then(
              (res) => {
                if (res.status === 200) {
                  let responseData = res.data;
                  if (responseData.code === 0) {
                    this.subing = false;

                    if (responseData.data === true) {
                      this.$message({
                        message: "此邮箱已经订阅过，请更换邮箱！",
                        type: 'error'
                      });
                    } else {
                      this.onSub();
                    }
                  } else {
                    this.subing = false;
                    this.$message.error(responseData.msg);
                  }
                } else {
                  this.subing = false;
                  this.$message.error("系统内部错误");
                }
              })
          }
        })
      },
      onSub() {
        this.$axios.post(Service.url.sub, this.subModel).then(
          (res) => {
            if (res.status === 200) {
              let responseData = res.data;
              if (responseData.code === 0) {
                this.subing = false;
                this.$message({
                  message: responseData.msg,
                  type: 'success'
                });

                this.$refs.subForm.resetFields();
              } else {
                this.subing = false;
                this.$message.error(responseData.msg);
              }
            } else {
              this.subing = false;
              this.$message.error("系统内部错误");
            }
          })
      }
    }
  }
</script>

<style scoped>
  .sub-container {
    width: 100%;
    height: 100%;
  }

  .sub-page {
    width: 600px;
    margin: 10px auto;
  }
</style>
