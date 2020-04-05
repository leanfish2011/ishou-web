<template>
  <div id="my">
    <nav-header></nav-header>
    <div v-bind:style="{minHeight: Height+'px'}">
      <ul :class="'ulstyle'">
        <li v-for="item in myDataList" :key="item.id" :class="'listyle'">
          <a :href=item.url target="_blank">{{item.name}}</a>
        </li>
      </ul>
    </div>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
  import NavHeader from '../NavHeader'
  import Footer from '../Footer'
  import Service from '../../../config/service'
  import AuthUtil from '../../../utils/authUtil'

  export default {
    name: 'my',
    components: {
      "navHeader": NavHeader,
      "bottomFooter": Footer,
    },
    data() {
      return {
        myDataList: null,
        Height: 0,
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
    created() {
      this.load();
    },
    mounted() {
      //动态设置内容高度 让footer始终居底   header+footer的高度是100
      this.Height = document.documentElement.clientHeight - 185;
      //监听浏览器窗口变化　
      window.onresize = () => {
        this.Height = document.documentElement.clientHeight - 180;
      }
    }
  }
</script>

<style scoped>
  #my {
    background: bisque;
    height: 100%;
    width: 100%;
    margin-top: 110px;
  }

  .ulstyle {
    margin: 0;
    padding: 0;
  }

  .listyle {
    list-style-type: none;
    padding: 7px;
    background-color: #ffeecc;
    border-bottom: 1px solid white;
  }
</style>
