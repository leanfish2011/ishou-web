<template>
  <div>
    <el-dialog
      title="新增网页收藏"
      :visible.sync="visible"
      @close="onClose"
      :show="show">
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
          this.$axios.post(Service.url.sitePersonal, this.addModel).then((res) => {
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
          this.$axios.put(Service.url.sitePersonal, this.addModel).then((res) => {
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
