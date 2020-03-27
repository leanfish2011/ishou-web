<template>
  <div>
    <el-dialog
      title="权限管理"
      :visible.sync="visible"
      @close="onClose"
      :show="show">
      <span>角色名称：{{roleModel.name}} 角色备注：{{roleModel.remark}}</span>
      <el-tabs v-model="activeName">
        <el-tab-pane label="分配菜单" name="tabMenu">
          <el-tree
            :data="menuData"
            show-checkbox
            node-key="id"
            ref="menuTree"
            default-expand-all
            :props="defaultProps">
          </el-tree>
        </el-tab-pane>
        <el-tab-pane label="分配用户" name="tabUser">
          <el-container>
            <el-aside width="200px">
              <div class="tag-selectedUser">
                <span class="tag-group__title">已选用户：</span>
                <el-tag
                  :key="tag"
                  v-for="tag in dynamicTags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{tag}}
                </el-tag>
              </div>
            </el-aside>
            <el-main>
              <div class="alluser">
                <span class="tag-group__title">选择用户：</span>
                <el-table
                  ref="multipleUserTable"
                  :data="tableUserData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="userCode"
                    label="用户名"
                    width="120">
                  </el-table-column>
                </el-table>
              </div>
            </el-main>
          </el-container>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit" :loading="submiting">确定</el-button>
        <el-button @click="onCancel">取消</el-button>
      </span>
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
        },
        activeName: 'tabMenu',
        dynamicTags: ['标签一', '标签二', '标签三'],
        tableUserData: null,
        multipleSelection: []
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
        this.loadRoleMenu();
      }
    },
    methods: {
      onSubmit() {
        this.addModel.roleId = this.roleModel.id;
        this.addModel.menuIdList = this.$refs.menuTree.getCheckedKeys();
        console.log(this.addModel);
        this.$axios.post(Service.url.menuRole, this.addModel, {
          headers: {
            'Authorization': sessionStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            if (responseData.code === 0) {
              this.$message.success(responseData.msg);
              this.visible = false;
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
      },
      onCancel() {
        this.$refs.menuTree.setCheckedKeys([]);
        this.$emit('update:show', false);
        this.addModel = Object.assign({}, "");//清空model
      },
      onClose() {
        this.onCancel();
      },
      loadAllMenu() {
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
      loadRoleMenu() {
        this.$axios.get(Service.url.menuRole + "/" + this.roleModel.id, {
          headers: {
            'Authorization': sessionStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            if (responseData.code === 0) {
              //选中菜单
              this.$refs.menuTree.setCheckedKeys(responseData.data);
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
      loadAllUser() {
        this.$axios.get(Service.url.user, {
          headers: {
            'Authorization': sessionStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            if (responseData.code === 0) {
              this.tableUserData = responseData.data;
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
      loadRoleUser(){

      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleUserTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleUserTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    created() {
      this.loadAllMenu();
      this.loadAllUser();
    }
  }
</script>

<style scoped>

</style>
