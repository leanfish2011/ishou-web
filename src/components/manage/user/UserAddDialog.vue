<template>
  <div>
    <el-dialog
      title="新增用户"
      :visible.sync="dialogFormVisible">
      <el-form ref="addForm" :model="addModel" label-width="80px" :rules="validRule"
               status-icon
               class="register-page">
        <el-form-item label="用户名" prop="userCode">
          <el-input v-model="addModel.userCode" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addModel.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addModel.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addModel.email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="submiting">确定</el-button>
          <el-button @click="onCloseDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import Service from '../../../config/service'
  import AuthUtil from '../../../utils/authUtil'

  export default {
    name: "userAddDialog",
    data() {
      return {
        dialogFormVisible: false,
        submiting: false,
        addModel: {
          id: "",
          userCode: "",
          password: "",
          name: "",
          email: "",
        },
        validRule: {
          userCode: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}],
          name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          ]
        }
      };
    },
    methods: {
      onSubmit() {
        if (this.addModel.id === "" || this.addModel.id === undefined) {
          this.$axios.post(Service.url.user, this.addModel, {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          }).then((res) => {
            if (res.status === 200) {
              let responseData = res.data;
              if (responseData.code === 0) {
                this.$message.success(responseData.msg);
                this.onCloseDialog();
                this.$emit('refresh');
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
          })
        } else {
          this.$axios.put(Service.url.user, this.addModel, {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          }).then((res) => {
            if (res.status === 200) {
              let responseData = res.data;
              if (responseData.code === 0) {
                this.$message.success(responseData.msg);
                this.onCloseDialog();
                this.$emit('refresh');
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
          })
        }
      },
      onCloseDialog() {
        this.$refs.addForm.resetFields();
        this.dialogFormVisible = false;
        this.addModel = Object.assign({}, "");//将数据传入dialog页面
      },
      onClose() {
        this.onCloseDialog();
      }
    }
  }
</script>

<style scoped>

</style>
