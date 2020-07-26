<template>
  <label>
    <h2>关于我</h2>
    <p>技术爱好者，喜欢折腾各种技术。从前端html5、CSS3、vue，到后端Java、Python、Go，以及数据库Mongodb、Redis等都有所研究。</p>
    <p>文学爱好者，喜欢读各种书，尤其是中国古典文学。也喜欢写一些文章。</p>
    <h4>联系我：</h4>
    <p><img style="margin-right: 5px;" src="../../../../../static/img/email.jpg" height="20"
            width="20"/>邮箱：leanfish2011@163.com
    </p>
    <p><img style="margin-right: 5px;" src="../../../../../static/img/wenxin.png" height="20"
            width="20"/>微信公众号：leanfisher
    </p>
    <p>或者扫描下面二维码关注我的公众号</p>
    <img class="weixinImg" src="../../../../../static/img/weixinsite.jpg"/>
    <p><img style="margin-right: 5px;" height="20" width="20"
            src="../../../../../static/img/weibo.png"/>微博：<a href="http://weibo.com/u/1718711654"
                                                             target="_blank">闯荡南北的鱼</a></p>
    <p><img style="margin-right: 5px;" src="../../../../../static/img/blog.jpg" height="20"
            width="20"/>博客：<a
      href="https://www.cnblogs.com/leanfish" target="_blank">瘦鱼 - 博客园</a></p>
  </label>
</template>

<script>
  export default {
    name: "Me"
  }
</script>

<style scoped>
  .weixinImg {
    height: 200px;
    width: 200px;
  }

  a:link, a:visited {
    text-decoration: none;
    color: #2f65ca
  }

  /* 已访问的链接 */
  a:hover {
    color: #5c31ff
  }
</style>
