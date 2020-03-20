<template>
  <div>
    <el-dialog
      title="新增网页收藏"
      :visible.sync="visible"
      @close="$emit('update:show', false)"
      :show="show">
      <el-form ref="addForm" :model="addModel" label-width="80px" :rules="validRule"
               status-icon
               class="register-page">
        <el-form-item label="标题" prop="title">
          <el-input v-model="addModel.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="url">
          <el-input v-model="addModel.url" placeholder="请输入链接"></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="tag">
          <el-input v-model="addModel.tag" placeholder="请输入标签"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="submiting">注册</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "siteAddDialog",
    data() {
      return {
        visible: this.show,
        submiting: false,
        addModel: {
          title: '',
          url: '',
          tag: ''
        },
        validRule: {
          title: [{required: true, message: '请输入标题', trigger: 'blur'}],
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
        console.log(12);
      },
      onCancel() {
        this.$refs.addForm.resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
