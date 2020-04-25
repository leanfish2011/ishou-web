<template>
  <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="20%">
    <el-form :model="updateModel" ref="addForm" :rules="validRule">
      <el-form-item label="旧密码" :label-width="formLabelWidth" prop="oldPassword">
        <el-input v-model="updateModel.oldPassword" autocomplete="off"
                  placeholder="请输入旧密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
        <el-input v-model="updateModel.newPassword" autocomplete="off"
                  placeholder="请输入新密码"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onCloseDialog">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Service from '../../config/service'
  import AuthUtil from '../../utils/authUtil'

  export default {
    name: "ChangePwdDialog",
    data() {
      return {
        dialogFormVisible: false,
        updateModel: {
          id: '',
          oldPassword: '',
          newPassword: '',
        },
        formLabelWidth: '70px',
        validRule: {
          oldPassword: [{required: true, message: '请输入旧密码', trigger: 'blur'}],
          newPassword: [{required: true, message: '请输入新密码', trigger: 'blur'}]
        }
      };
    },
    methods: {
      onCloseDialog() {
        this.$refs.addForm.resetFields();
        this.dialogFormVisible = false;
        this.updateModel = Object.assign({}, "");
      },
      submit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.updateModel.id = localStorage.getItem("userId");
            this.$axios.put(Service.url.changePwd, this.updateModel,
              {
                headers: {
                  'Authorization': localStorage.getItem('token')
                }
              }).then((res) => {
              if (res.status === 200) {
                let responseData = res.data;
                if (responseData.code === 0) {
                  this.$message.success(responseData.msg);
                  this.onCloseDialog();
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
            });
          } else {
            console.log('请检查参数！');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
