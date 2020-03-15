<template>
  <div id="home">
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

  export default {
    name: 'home',
    components: {
      "navMenu": NavMenu
    },
    data() {
      return {
        myDataList: null
      }
    },
    created() {
      this.$axios.get('http://127.0.0.1:9092/api/v1/site/index').then((res) => {
        this.myDataList = res.data.data;
      }).catch(function (error) {
        console.error(error);
      });
    }
  }
</script>

<style scoped>
  #home {
    background: gainsboro;
    height: 600px;
    width: 100%;
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
