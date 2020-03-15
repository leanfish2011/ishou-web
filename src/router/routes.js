// 引入各个组件
import Home from '../components/home/item/Home.vue'
import Hot from '../components/home/item/Hot.vue'
import Message from '../components/home/item/Message.vue'
import About from '../components/home/item/About.vue'
import Login from '../components/home/login/Login.vue'
import Register from '../components/home/login/Register.vue'

// 设置路径
export default [
  {path: "/", component: Home},
  {path: "/hot", component: Hot},
  {path: "/message", component: Message},
  {path: "/about", component: About},
  {path: "/login", component: Login},
  {path: "/register", component: Register}
]
