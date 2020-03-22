<template>
  <div>
    <el-dialog
      title="分配权限"
      :visible.sync="visible"
      @close="onClose"
      :show="show">
      <p>角色名称：{{roleModel.name}} 角色备注：{{roleModel.remark}}</p>
      <el-tree
        :data="menuData"
        show-checkbox
        node-key="id"
        ref="menuTree"
        default-expand-all
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
        :props="defaultProps">
      </el-tree>
    </el-dialog>
  </div>
</template>

<script>
  import Service from '../../../config/service'
  import AuthUtil from '../../../utils/authUtil'

  export default {
    name: "roleMenuDialog",
    data() {
      return {
        visible: this.show,
        submiting: false,
        addModel: {
          menuIdList: null,
          roleId: ""
        },
        roleModel: {
          id: "",
          name: "",
          remark: ""
        },
        validRule: {
          name: [{required: true, message: '请输入名称', trigger: 'blur'}]
        },
        menuData: null,
        defaultProps: {
          children: 'children',
          label: 'name'
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
          this.$axios.post(Service.url.role, this.addModel, {
            headers: {
              'Authorization': sessionStorage.getItem('token')
            }
          }).then((res) => {
            if (res.status === 200) {
              let responseData = res.data;
              if (responseData.code === 0) {
                this.$message.success(responseData.msg);
                this.visible = false;
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
          this.$axios.put(Service.url.role, this.addModel, {
            headers: {
              'Authorization': sessionStorage.getItem('token')
            }
          }).then((res) => {
            if (res.status === 200) {
              let responseData = res.data;
              if (responseData.code === 0) {
                this.$message.success(responseData.msg);
                this.visible = false;
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
      onCancel() {
        this.$refs.addForm.resetFields();
        this.$emit('update:show', false);
        this.addModel = Object.assign({}, "");//将数据传入dialog页面
      },
      onClose() {
        this.onCancel();
      },
      load() {
        this.$axios.get(Service.url.menuAll, {
          headers: {
            'Authorization': sessionStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            if (responseData.code === 0) {
              this.menuData = responseData.data;
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
        }).catch(function (error) {
          console.error(error);
        });
      },
    },
    created() {
      this.load();
    }
  }
</script>

<style scoped>

</style>
