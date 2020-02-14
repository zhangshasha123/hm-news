// 配置路由规则
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/login.vue'
import Register from '../pages/register.vue'
import Profile from '../pages/profile.vue'
import EditProfile from '../pages/EditProfile.vue'
import Follow from '../pages/follow.vue'
import Post from '../pages/post.vue'
import Collect from '../pages/collect.vue'
import Home from '../pages/home.vue'
import newsDetail from '../pages/newsDetail.vue'
import TabManager from '../pages/TabManager.vue'
import Search from '../pages/search.vue'
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    // 配置路由规则
    { path: '/', component: Home, name: 'home' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/profile', component: Profile, name: 'profile' },
    { path: '/edit-profile', component: EditProfile, name: 'edit-profile' },
    { path: '/follow', component: Follow, name: 'follow' },
    { path: '/post', component: Post, name: 'post' },
    { path: '/collect', component: Collect, name: 'collect' },
    { path: '/home', component: Home, name: 'home' },
    { path: '/news-detail/:id', component: newsDetail, name: 'news-detail' },
    { path: '/tab-manager', component: TabManager, name: 'tab-manager' },
    { path: '/search', component: Search, name: 'search' }

  ]
})
// 给路由对象注册前置导航守卫
// to:到哪里去
// from:从哪里来
// Next:是一个函数，next():代表放行 next('/login')
// 需要授权的路径
const AuthUrls = [
  '/profile',
  '/edit-profile',
  '/follow',
  '/collect',
  '/post'
]
router.beforeEach(function (to, from, next) {
  const token = localStorage.getItem('token')
  if (AuthUrls.includes(to.path)) {
    if (token) {
      next()
    } else {
      // next('/login')
      router.push('/login')
    }
  } else {
    next()
  }
})
export default router
