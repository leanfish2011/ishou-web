<template>
  <div id="my">
    <nav-menu></nav-menu>
    <ul :class="'ulstyle'">
      <li v-for="item in myDataList" :key="item.id" :class="'listyle'">
        <a :href=item.url target="_blank">{{item.name}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import NavMenu from '../NavMenu'
  import Service from '../../../config/service'
  import AuthUtil from '../../../utils/authUtil'

  export default {
    name: 'my',
    components: {
      "navMenu": NavMenu
    },
    data() {
      return {
        myDataList: null
      }
    },
    methods: {
      load() {
        this.$axios.get(Service.url.sitePersonal, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        }).then((res) => {
          if (res.status === 200) {
            let responseData = res.data;
            if (responseData.code === 0) {
              this.myDataList = responseData.data;
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
    },
    created: function () {
      this.load();
    }
  }
</script>

<style scoped>
  #my {
    background: bisque;
    height: 100%;
    width: 100%;
  }
</style>
