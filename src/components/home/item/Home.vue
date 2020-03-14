<template>
  <div id="home">
    <h1>主页</h1>
    <ul class="ulstyle">
      <li v-for="item in myDataList" :key="item" class="listyle">
        <ul class="ulstyle">
          <li>
            {{item.id}}
          </li>
          <li>{{item.name}}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data() {
      return {
        myDataList: [
          {id: 1, name: 'TigerChain'},
          {id: 2, name: 'TigerChain'},
          {id: 3, name: 'TigerChain'},
          {id: 4, name: 'TigerChain'},
          {id: 5, name: 'TigerChain'},
          {id: 6, name: 'TigerChain'},
          {id: 7, name: 'TigerChain'},
          {id: 8, name: 'TigerChain'},
          {id: 9, name: 'TigerChain'},
          {id: 10, name: 'TigerChain'},
          {id: 11, name: 'TigerChain'},
          {id: 12, name: 'TigerChain'},
          {id: 13, name: 'TigerChain'},
          {id: 14, name: 'TigerChain'},
          {id: 15, name: 'TigerChain'},
          {id: 16, name: 'TigerChain'},
          {id: 17, name: 'TigerChain'}
        ]
      }
    }
  }
</script>

<style scoped>
  #home {
    margin: 0;
    padding: 0;
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
