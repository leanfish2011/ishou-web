// 引入各个组件
import Home from '../components/home/item/Home.vue'
import Hot from '../components/home/item/Hot.vue'
import Message from '../components/home/item/Message.vue'
import About from '../components/home/item/About.vue'
import Login from '../components/home/login/Login.vue'
import Register from '../components/home/login/Register.vue'
import Manage from '../components/manage/Manage.vue'
import Site from '../components/manage/site/Site.vue'
import Type from '../components/manage/site/Type.vue'
import User from '../components/manage/user/User.vue'
import Role from '../components/manage/user/Role.vue'
import RouteUrl from '../config/routeUrl'

// 设置路由
export default [
  {path: RouteUrl.route.home, component: Home},
  {path: RouteUrl.route.hot, component: Hot},
  {path: RouteUrl.route.message, component: Message},
  {path: RouteUrl.route.about, component: About},
  {path: RouteUrl.route.login, component: Login},
  {path: RouteUrl.route.register, component: Register},
  {
    path: RouteUrl.route.manage,
    component: Manage,
    children: [
      {path: RouteUrl.route.site, component: Site},
      {path: RouteUrl.route.type, component: Type},
      {path: RouteUrl.route.user, component: User},
      {path: RouteUrl.route.role, component: Role}
    ]
  }
]
