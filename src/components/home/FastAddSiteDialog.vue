<template>
  <el-dialog title="增加收藏" :visible.sync="dialogFormVisible" width="30%" :rules="validRule">
    <el-form :model="addModel" ref="addForm">
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="addModel.name" autocomplete="off" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="链接" :label-width="formLabelWidth">
        <el-input v-model="addModel.url" autocomplete="off" placeholder="请输入链接"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="addModel.isPost">发布到首页</el-checkbox>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onCloseDialog">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
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
          name: '',
          url: '',
          isPost: false
        },
        formLabelWidth: '50px',
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
        });
      }
    }
  }
</script>

<style scoped>

</style>
