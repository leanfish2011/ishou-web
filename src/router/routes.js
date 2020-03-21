// 引入各个组件
import Home from '../components/home/item/Home.vue'
import My from '../components/home/item/My.vue'
import Message from '../components/home/item/Message.vue'
import About from '../components/home/item/About.vue'
import Login from '../components/home/login/Login.vue'
import Register from '../components/home/login/Register.vue'
import Manage from '../components/manage/Manage.vue'
import Site from '../components/manage/site/Site.vue'
import Type from '../components/manage/site/Type.vue'
import User from '../components/manage/user/User.vue'
import Role from '../components/manage/user/Role.vue'
import Table from '../components/test/elmentui/Table'
import Slider from '../components/test/elmentui/Slider'

// 设置路径
export default [
  {path: "/", component: Home},
  {path: "/my", component: My},
  {path: "/message", component: Message},
  {path: "/about", component: About},
  {path: "/login", component: Login},
  {path: "/register", component: Register},
  {path: "/table", component: Table},
  {path: "/slider", component: Slider},
  {
    path: "/manage",
    component: Manage,
    children: [
      {path: "/site", component: Site},
      {path: "/type", component: Type},
      {path: "/user", component: User},
      {path: "/role", component: Role}
    ]
  }
]
