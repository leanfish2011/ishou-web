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
      <el-menu-item v-if="userName!=''&&userName!=null" index="/my">
        我的
      </el-menu-item>
      <el-menu-item index="/message">
        留言
      </el-menu-item>
      <el-menu-item index="/about">
        关于
      </el-menu-item>
      <span class="loginSpan">
        <el-link>
          <router-link v-if="userName==''||userName==null" to="/login">登 录</router-link>
          <el-dropdown v-else trigger="hover" :hide-on-click="false">
              <span class="el-dropdown-link">
                <router-link to="/site"> {{ userName }}</router-link>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="addSite">增加收藏</el-dropdown-item>
                <el-dropdown-item divided
                                  @click.native="logout">退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </el-link>
        <el-link>
          <router-link to="/register">注 册</router-link>
        </el-link>
        <fast-add-site-dialog ref="fastAddSite"></fast-add-site-dialog>
      </span>
    </el-menu>
  </div>
</template>

<script>
  import Service from '../../config/service'
  import AuthUtil from '../../utils/authUtil'
  import FastAddSiteDialog from './FastAddSiteDialog'

  export default {
    name: 'navMenu',
    components: {
      "fastAddSiteDialog": FastAddSiteDialog
    },
    data() {
      return {
        userName: '',
      }
    },
    methods: {
      logout: function () {
        this.$confirm('确认退出?', '提示', {})
        .then(() => {
          //调用接口
          this.$axios.get(Service.url.logout, {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          }).then((res) => {
            let responseData = res.data;
            if (responseData.code === 0) {
              AuthUtil.clearSession();
              this.userName = '';

              this.$router.push('/');
            } else {
              this.$message.error(responseData.msg);
            }
          }).catch(function (error) {
            console.error(error);
          });
        })
      },
      addSite: function () {
        this.$refs.fastAddSite.dialogFormVisible = true;
      }
    },
    mounted: function () {
      let userName = localStorage.getItem('userName');
      this.userName = userName;
    },
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
