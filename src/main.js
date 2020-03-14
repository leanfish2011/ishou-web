import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Routes from './router/routes'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
	routes:Routes,
	mode:"history"
})

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router:router
})
