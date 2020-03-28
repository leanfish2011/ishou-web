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
            <el-aside width="50%">
              <div class="tag-selectedUser">
                <span class="tag-group__title">已选用户：</span>
                <el-tag
                  :key="tag.id"
                  v-for="tag in userSelected"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{tag.name}}
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
        addMenuModel: {
          menuIdList: null,
          roleId: ""
        },
        addUserModel: {
          userIdList: null,
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
        tableUserData: null,
        userSelected: [],
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
        this.loadAllMenu();
        this.loadRoleMenu();

        this.loadAllUser();
        this.loadRoleUser();
      }
    },
    methods: {
      onSubmit() {
        //角色增加菜单
        this.addMenuModel.roleId = this.roleModel.id;
        this.addMenuModel.menuIdList = this.$refs.menuTree.getCheckedKeys();
        this.$axios.post(Service.url.menuRole, this.addMenuModel, {
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

        //角色增加用户
        this.addUserModel.roleId = this.roleModel.id;
        let userSelectedId = [];
        this.userSelected.forEach(user => {
          userSelectedId.push(user.id);
        });

        this.addUserModel.userIdList = userSelectedId;
        this.$axios.post(Service.url.roleUser, this.addUserModel, {
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
      loadRoleUser() {
        this.$axios.get(Service.url.roleUser + "/" + this.roleModel.id, {
          headers: {
            'Authorization': sessionStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            if (responseData.code === 0) {
              let roleUserData = responseData.data;
              this.userSelected = roleUserData;
              let userSelectedId = [];

              //选中用户
              this.userSelected.forEach(user => {
                userSelectedId.push(user.id);
              });

              this.tableUserData.forEach(row => {
                if (userSelectedId.indexOf(row.id) >= 0) {
                  console.log(row);
                  this.$refs.multipleUserTable.toggleRowSelection(row, true);
                }
              });
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
      handleClose(tag) {
        let delTag = tag;
        let multipleSelection2 = this.multipleSelection;
        let length = this.multipleSelection.length;
        let that = this;

        function search(arr, dst) {//返回寻找当前元素的index
          let i = arr.length;
          for (let j = 0; j < i; j++) {
            if (arr[j] == dst) {
              return j;
            }
          }
          return false;
        }

        this.$refs.multipleUserTable.clearSelection();//清空所有选择
        let arr = [];//存储剩下的选项
        for (let i = 0; i < length; i++) {
          if ((multipleSelection2[i]) != delTag) {//如果当前项是删除的那一项
            let num = search(that.tableUserData, multipleSelection2[i]);
            arr.push(that.tableUserData[num]);
          }
        }
        that.toggleSelection(arr);
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleUserTable.toggleRowSelection(row, true);
          });
        } else {
          this.$refs.multipleUserTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.userSelected = val;
      }
    },
    created() {

    }
  }
</script>

<style scoped>

</style>
