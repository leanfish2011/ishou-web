<template>
  <nav>
    <el-menu :default-active="$route.path"
             mode="horizontal"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b" :router="true">
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
    </el-menu>
  </nav>
</template>

<script>
  export default {
    name: 'navMenu',
  }
</script>

<style scoped>
  nav {
  }
</style>
