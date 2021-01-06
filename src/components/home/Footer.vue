<template>
  <div>
    <div class="footer">
      <div class="rightInfo">
        <p>Copyright © Tim 2016-2020</p>
      </div>
    </div>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>

<style scoped>
  .footer {
    height: 50px;
    background-color: #e5e8eb;
    text-align: center;
  }

  .rightInfo {
    height: 10px;
    width: 100%;
    position: relative;
    top: 30%;
    color: #41403d;
  }
</style>
