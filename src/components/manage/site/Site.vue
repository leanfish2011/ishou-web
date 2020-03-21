<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>网页管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form ref="form" :inline="true" :model="searchForm" label-width="80px" size="mini">
      <el-form-item label="标题">
        <el-input v-model="searchForm.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="searchForm.dateStart"
                          style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="11">
          <el-date-picker type="date" placeholder="选择日期" v-model="searchForm.dateEnd"
                          style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onAddShow">创建</el-button>
      </el-form-item>
    </el-form>
    <site-add-dialog :show.sync="isShowAdd" @refresh="load()"></site-add-dialog>
    <el-table
      :data="siteData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="url"
        label="链接"
        width="180">
        <template slot-scope="scope">
          <a :href="scope.row.url"
             target="_blank"
             class="buttonText">{{scope.row.url}}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签">
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
  import SiteAddDialog from './SiteAddDialog'
  import Service from '../../../config/service'

  export default {
    name: "Site",
    components: {
      "siteAddDialog": SiteAddDialog
    },
    data() {
      return {
        searchForm: {
          title: '',
          dateStart: '',
          dateEnd: ''
        },
        isShowAdd: false,
        siteData: null
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      onAddShow() {
        this.isShowAdd = true;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
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
        this.$axios.get(Service.url.sitePersonalGet).then((res) => {
          this.siteData = res.data.data;
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
