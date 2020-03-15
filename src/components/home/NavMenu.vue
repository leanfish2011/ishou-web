<template>
  <div>
    <el-menu :default-active="$route.path"
             mode="horizontal"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
             :router="true">
      <el-menu-item index="/">
        主页
      </el-menu-item>
      <el-menu-item index="/hot">
        热点
      </el-menu-item>
      <el-menu-item index="/message">
        留言
      </el-menu-item>
      <el-menu-item index="/about">
        关于
      </el-menu-item>
      <span class="loginSpan">
        <el-link>
          <router-link to="/login" target="_blank">登 录</router-link>
        </el-link>
        <el-link>
          <router-link to="/register" target="_blank">注 册</router-link>
        </el-link>
      </span>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'navMenu'
  }
</script>

<style>
  .loginSpan {
    float: right;
    position: relative;
    top: 50%;
    margin-top: 15px;
    margin-right: 10px;
  }

  .loginSpan a {
    color: white;
  }
</style>
