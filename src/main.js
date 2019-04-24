import Vue from 'vue'
import App from './App.vue'

// 导入mui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 导入axios
import axios from './assets/js/http.js'
Vue.use(axios)



//导入路由
import router from './router'


Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
