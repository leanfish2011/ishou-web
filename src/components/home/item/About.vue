<template>
  <div id="about">
    <nav-header></nav-header>
    <div v-bind:style="{minHeight: Height+'px'}">

      <el-tabs tab-position="left">
        <el-tab-pane label="关于我">
          <h2>关于我</h2>
          <p>技术爱好者，喜欢折腾各种技术。从前端html5、CSS3、vue，到后端Java、Python、Go，以及数据库Mongodb、Redis等都有所研究。</p>
          <p>文学爱好者，喜欢读各种书，尤其是中国古典文学。也喜欢写一些文章。</p>
          <h4>联系我：</h4>
          <p>邮箱：leanfish2011@163.com</p>
          <p>微信公众号：</p>
          <img class="weixinImg" src="../../../../static/img/weixinsite.jpg"/>
        </el-tab-pane>
        <el-tab-pane label="更新日志">
          <h2>更新日志</h2>
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :timestamp="activity.timestamp"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              size="large" placement="top">
              <el-card>
                <h4>{{activity.title}}</h4>
                <p>{{activity.content}}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
      </el-tabs>
    </div>
    <bottom-footer></bottom-footer>
  </div>
</template>

<script>
  import Footer from '../Footer'
  import NavHeader from '../NavHeader'

  export default {
    name: 'about',
    components: {
      "bottomFooter": Footer,
      "navHeader": NavHeader
    },
    data() {
      return {
        Height: 0,
        activities: [
          {
            timestamp: '2020-03-29',
            title: '爱收藏网站上线',
            content: '之前的博客系统停用，打造用于收藏网站的系统。',
            type: 'primary',
            icon: 'el-icon-more'
          },
          {
            timestamp: '2018-05-03',
            title: '基于spring cloud博客系统',
            content: '使用spring cloud重新实现了博客系统。拆分了各个服务，前后端分离',
            color: '#0bbd87'
          },
          {
            timestamp: '2018-02-09',
            title: '多人博客系统上线',
            content: '打造了可以多人注册使用的博客系统。',
          },
          {
            timestamp: '2014-11-04',
            title: '个人博客上线',
            content: '基于免费的云服务器，上线个人博客系统。',
          }]
      }
    },
    mounted() {
      //动态设置内容高度 让footer始终居底   header+footer的高度是100
      this.Height = document.documentElement.clientHeight - 185;
      //监听浏览器窗口变化　
      window.onresize = () => {
        this.Height = document.documentElement.clientHeight - 185;
      }
    }
  }
</script>

<style scoped>
  #about {
    height: 100%;
    width: 100%;
    margin-top: 110px;
  }

  .weixinImg {
    height: 200px;
    width: 200px;
  }
</style>
