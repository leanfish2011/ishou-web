<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :inline="true" :model="searchForm" label-width="80px" size="mini">
      <el-form-item label="姓名">
        <el-input v-model="searchForm.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="searchForm.userCode" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="searchForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
          :default-time="['00:00:00', '23:59:59']"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onAddShow">创建</el-button>
      </el-form-item>
    </el-form>
    <user-add-dialog ref="addDialog" :show.sync="isShowAdd" @refresh="load()"></user-add-dialog>
    <el-table
      :data="userData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userCode"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间" :formatter="dateFormat">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import UserAddDialog from './UserAddDialog'
  import Service from '../../../config/service'

  export default {
    name: "user",
    components: {
      "userAddDialog": UserAddDialog
    },
    data() {
      return {
        searchForm: {
          name: '',
          userCode: '',
          beginTime: '',
          endTime: '',
          email: ''
        },
        value2: '',
        isShowAdd: false,
        userData: null,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setHours(0);
              start.setMinutes(0);
              start.setSeconds(0);

              end.setHours(23);
              end.setMinutes(59);
              end.setSeconds(59);

              start.setDate(start.getDay() - 7);

              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();

              start.setHours(0);
              start.setMinutes(0);
              start.setSeconds(0);

              end.setHours(23);
              end.setMinutes(59);
              end.setSeconds(59);

              start.setDate(start.getDay() - 30);

              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();

              start.setHours(0);
              start.setMinutes(0);
              start.setSeconds(0);

              end.setHours(23);
              end.setMinutes(59);
              end.setSeconds(59);

              start.setDate(start.getDay() - 90);

              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    },
    methods: {
      onSearch() {
        if (this.value2 != null) {
          this.searchForm.beginTime = this.value2[0];
          this.searchForm.endTime = this.value2[1];
        } else {
          this.searchForm.beginTime = "";
          this.searchForm.endTime = "";
        }
        this.$axios.get(Service.url.user, {
          headers: {
            'Authorization': sessionStorage.getItem('token')
          },
          params: this.searchForm
        }).then((res) => {
          this.userData = res.data.data;
        }).catch(function (error) {
          console.error(error);
        });
      },
      onAddShow() {
        this.isShowAdd = true;
      },
      handleEdit(index, row) {
        this.isShowAdd = true;//dialog对话窗口打开
        this.$refs.addDialog.addModel = Object.assign({}, row);//将数据传入dialog页面
      },
      handleDelete(index, row) {
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete(Service.url.user + '/' + row.id, {
            headers: {
              'Authorization': sessionStorage.getItem('token')
            }
          }).then((res) => {
            if (res.status === 200) {
              let responseData = res.data;
              if (responseData.code === 0) {
                this.$message.success(responseData.msg);
                this.load();
              } else {
                this.$message.error(responseData.msg);
              }
            } else {
              this.$message.error("系统内部错误");
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //时间格式化
      dateFormat: function (row, column) {
        let date = new Date(parseInt(row.createTime));
        let Y = date.getFullYear() + '-';
        let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1
          + '-';
        let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
        let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
      },
      load() {
        this.$axios.get(Service.url.user, {
          headers: {
            'Authorization': sessionStorage.getItem('token')
          }
        }).then((res) => {
          this.userData = res.data.data;
        }).catch(function (error) {
          console.error(error);
        });
      }
    },
    created() {
      this.load();
    }
  }
</script>

<style scoped>

</style>
