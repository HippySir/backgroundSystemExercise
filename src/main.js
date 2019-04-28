import Vue from 'vue'
import App from './App.vue'

// 导入mui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 引入富文本域
import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor)
import 'quill/dist/quill.core.css' 
import 'quill/dist/quill.snow.css' 
import 'quill/dist/quill.bubble.css'

// 导入axios
import axios from './assets/js/http.js'
Vue.use(axios)

// 导入公共样式文件
import './assets/css/main.less'

//导入路由
import router from './router'

// 将面包屑导航栏注册成为全局组件
import breadcrums from './components/common/breadcrums.vue'
Vue.component('breadcrums',breadcrums)

// 设置全局的过滤器
// 处理时间格式的过滤器
import moment from 'moment'
Vue.filter('timeDisposal', function (value) {
  if (!value) return ''
  return moment(value).format('YYYY-MM-DDTHH:mm:ss');
})

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
