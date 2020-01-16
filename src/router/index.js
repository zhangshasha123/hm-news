// 配置路由规则
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/login.vue'
import Register from '../pages/register.vue'
import Profile from '../pages/profile.vue'
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    // 配置路由规则
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/profile', component: Profile, name: 'profile' }

  ]
})
export default router
