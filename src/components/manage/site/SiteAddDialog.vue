<template>
  <div>
    <el-dialog
      title="新增网页收藏" :visible.sync="dialogFormVisible">
      <el-form ref="addForm" :model="addModel" label-width="80px" :rules="validRule"
               status-icon
               class="register-page">
        <el-form-item label="标题" prop="name">
          <el-input v-model="addModel.name" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="url">
          <el-input v-model="addModel.url" placeholder="请输入链接"></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="tag">
          <el-input v-model="addModel.tag" placeholder="请输入标签"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="addModel.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="addModel.isPost">发布到首页</el-checkbox>
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
    name: "siteAddDialog",
    data() {
      return {
        dialogFormVisible: false,
        submiting: false,
        addModel: {
          id: "",
          name: "",
          remark: "",
          tag: "",
          url: "",
          isPost: false
        },
        validRule: {
          name: [{required: true, message: '请输入标题', trigger: 'blur'}],
          url: [{required: true, message: '请输入链接', trigger: 'blur'}],
          tag: [{required: true, message: '请输入标签', trigger: 'blur'}]
        }
      };
    },
    methods: {
      onSubmit() {
        if (this.addModel.id === "" || this.addModel.id === undefined) {
          console.log("新增");
          this.$axios.post(Service.url.sitePersonal, this.addModel,
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
          console.log(this.addModel);
          this.$axios.put(Service.url.sitePersonal, this.addModel, {
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
