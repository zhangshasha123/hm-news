//  入口文件
// 导入vue
import Vue from 'vue'
// 导入入口文件app.vue
import App from './App.vue'

// 导入./router下的index.js
import router from './router'
// 导入rem布局的文件
import 'lib-flexible'
// 导入通用的css文件
import './styles/base.css'
// 导入字体图标文件
import './styles/iconfont.css'
import moment from 'moment'
import axios from 'axios'
import HmNav from './components/HmNav.vue'
import HmHeader from './components/HmHeader.vue'
// 导入vant中的button组件
import { Toast, Button, Dialog, Field, Cell, RadioGroup, CellGroup, Radio, Uploader, List, Tab, Tabs, PullRefresh } from 'vant'

// ----------------------axios优化------------------------------
Vue.prototype.$axios = axios
// 给axios设置默认的baseURL (基准路径)  会自动拼接url参数
axios.defaults.baseURL = 'http://localhost:3000'
// axios.defaults.baseURL = 'http://192.168.0.105:3000'
Vue.prototype.$fixUrl = function (url) {
  if (url.startsWith('http')) {
    return url
  } else {
    return axios.defaults.baseURL + url
  }
}

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.statusCode === 401 && response.data.message === '用户信息验证失败') {
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    // 给一个提示的消息
    Toast.fail('用户信息验证失败')
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

// ------------------------------------------------------

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // config指的是请求的配置参数
  // 通过config.headers来设置请求头
  // 如果有token，就给接口携带上token
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  // 对请求错误做些什么
  return config
})
// ------------------filter过滤器---------------------------------
Vue.filter('time', function (input, format = 'YYYY-MM-DD') {
  return moment(input).format(format)
})
Vue.use(Toast)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Uploader)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(PullRefresh)
// 全局注册hmNav组件
Vue.component('HmNav', HmNav)
Vue.component('HmHeader', HmHeader)
// 关闭console面板的提示
Vue.config.productionTip = false
// 创建vue实例关联
new Vue({
  // 关联路由
  router,
  // 固定写法
  render: h => h(App)
  // 把app挂载
}).$mount('#app')
