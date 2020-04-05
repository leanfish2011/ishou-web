<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">测试</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip effect="dark" :content="`消息中心`" placement="bottom">
            <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator"><img src="static/img/img.jpg"></div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        测试 <i class="el-icon-caret-bottom"></i>
                    </span>

          <el-dropdown-menu slot="dropdown">

            <a href="https://github.com/merciqiao" target="_blank">
              <el-dropdown-item>关于作者</el-dropdown-item>
            </a>
            <a href="https://github.com/merciqiao/merciqiao-vue" target="_blank">
              <el-dropdown-item>项目仓库</el-dropdown-item>
            </a>
            <a href="/zanzhu" target="_blank">
              <el-dropdown-item style="color:orange;">赞助作者</el-dropdown-item>
            </a>
            <el-dropdown-item divided command="changeZh">切换中文</el-dropdown-item>
            <el-dropdown-item command="changeEn">切换英文</el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        collapse: false,
        fullscreen: false,
        name: 'merciqiao',
        lev: '青铜级',
        message: 2
      }
    },
    computed: {
      // username() {
      //   let username = this.$common.getSessionStorage('username');
      //   return username ? username : this.name;
      // },
      // getlev() {
      //
      //   let levList = this.$common.getSessionStorage('lev', true);
      //   let lev = '';
      //   if (levList) {
      //     for (var i = 0; i < levList.length; i++) {
      //       lev += levList[i].roleName;
      //     }
      //   }
      //
      //   return lev ? lev : this.lev;
      // }
    },
    methods: {
      // 用户名下拉菜单选择事件
      handleCommand(command) {
        // if (command == 'loginout') {
        //   this.$common.removeSessionStorage('token');
        //   this.$router.push('/login');
        // }
        // else if (command == 'changeZh') {
        //   this.$i18n.locale = 'zh_CN';
        // }
        // else if (command == 'changeEn') {
        //   this.$i18n.locale = 'en_US';
        // }
      },
      // 侧边栏折叠
      collapseChage() {
        // this.collapse = !this.collapse;
        // bus.$emit('collapse', this.collapse);
      },
    },
    mounted() {
      if (document.body.clientWidth < 1366) {
        this.collapseChage();
      }
    }
  }
</script>
<style scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
  }

  .collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
  }

  .header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
  }

  .header-right {
    float: right;
    padding-right: 50px;
  }

  .header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
  }

  .btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
  }

  .btn-bell, .btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
  }

  .btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
  }

  .btn-bell .el-icon-bell {
    color: #fff;
  }

  .user-name {
    margin-left: 10px;
  }

  .user-avator {
    margin-left: 20px;
  }

  .user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }
</style>
