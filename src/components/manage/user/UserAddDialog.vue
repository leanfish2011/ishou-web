<template>
  <div>
    <el-dialog
      title="新增用户"
      :visible.sync="visible"
      @close="onClose"
      :show="show">
      <el-form ref="addForm" :model="addModel" label-width="80px" :rules="validRule"
               status-icon
               class="register-page">
        <el-form-item label="用户名" prop="userCode">
          <el-input v-model="addModel.userCode" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addModel.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addModel.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addModel.email" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="submiting">确定</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import Service from '../../../config/service'

  export default {
    name: "siteAddDialog",
    data() {
      return {
        visible: this.show,
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
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      show() {
        this.visible = this.show;
      }
    },
    methods: {
      onSubmit() {
        if (this.addModel.id === "") {
          console.log("新增");
          this.$axios.post(Service.url.user, this.addModel).then((res) => {
            if (res.status === 200) {
              let responseData = res.data;
              if (responseData.code === 0) {
                this.$message.success(responseData.msg);
                this.visible = false;
                this.$emit('refresh');
              } else {
                this.$message.error(responseData.msg);
              }
            } else {
              this.$message.error("系统内部错误");
            }
          })
        } else {
          console.log(this.addModel);
          this.$axios.put(Service.url.user, this.addModel).then((res) => {
            if (res.status === 200) {
              let responseData = res.data;
              if (responseData.code === 0) {
                this.$message.success(responseData.msg);
                this.visible = false;
                this.$emit('refresh');
              } else {
                this.$message.error(responseData.msg);
              }
            } else {
              this.$message.error("系统内部错误");
            }
          })
        }

      },
      onCancel() {
        this.$refs.addForm.resetFields();
        this.$emit('update:show', false);
        this.addModel = Object.assign({}, "");//将数据传入dialog页面
      },
      onClose() {
        this.onCancel();
      }
    }
  }
</script>

<style scoped>

</style>
