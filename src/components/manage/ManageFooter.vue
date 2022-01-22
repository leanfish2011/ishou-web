<template>
  <footer>
    <div class="footer_content">
      Copyright © Tim 2016-{{year}}
    </div>
  </footer>
</template>

<script>
  export default {
    name: "ManageFooter",
    data() {
      return {
        year: ''
      }
    },
    methods: {
      getYear() {
        this.year = new Date().getFullYear()
      }
    },
    created() {
      this.getYear()
    }
  }
</script>

<style scoped>
  footer {
    border-top: 1px solid #ddd;
    flex: 0 0 auto;
  }

  .footer_content {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    line-height: 60px;
    height: 6px;
    color: #606266;
  }

</style>
