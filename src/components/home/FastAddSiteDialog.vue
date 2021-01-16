<template>
  <el-dialog title="增加收藏" :visible.sync="dialogFormVisible" width="30%">
    <el-form :model="addModel" ref="addForm" :rules="validRule">
      <el-form-item label="链接" :label-width="formLabelWidth" prop="url">
        <el-input v-model="addModel.url" autocomplete="off" placeholder="请输入链接"></el-input>
      </el-form-item>
      <el-form-item label="标题" :label-width="formLabelWidth" prop="name">
        <el-input v-model="addModel.name" autocomplete="off" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="标签" :label-width="formLabelWidth" prop="tag">
        <el-input v-model="addModel.tag" placeholder="请输入标签"></el-input>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="addModel.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item label="发布到首页" prop="isPost">
        <el-switch v-model="addModel.isPost"></el-switch>
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
    name: "FastAddSiteDialog",
    data() {
      return {
        dialogFormVisible: false,
        addModel: {
          url: "",
          name: "",
          tag: "",
          remark: "",
          isPost: false
        },
        formLabelWidth: '60px',
        validRule: {
          name: [{required: true, message: '请输入标题', trigger: 'blur'}],
          url: [{required: true, message: '请输入链接', trigger: 'blur'}]
        }
      };
    },
    methods: {
      onCloseDialog() {
        this.$refs.addForm.resetFields();
        this.dialogFormVisible = false;
        this.addModel = Object.assign({}, "");
      },
      submit() {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
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
