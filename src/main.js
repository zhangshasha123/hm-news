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
// 导入vant中的button组件
import { Toast, Button } from 'vant'
Vue.use(Toast)
Vue.use(Button)

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
