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
    <site-add-dialog :show.sync="isShowAdd"></site-add-dialog>
  </div>
</template>

<script>
  import SiteAddDialog from './SiteAddDialog'

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
        isShowAdd: false
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      onAddShow() {
        this.isShowAdd = true;
      },

    }
  }
</script>

<style scoped>

</style>
