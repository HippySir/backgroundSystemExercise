import Vue from 'vue'

//导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入相关组件
// 导入组件
import login from './components/login.vue'         //登陆页
import index from './components/index.vue'         //首页
let routes = [
    {
      name:'login',
      path:'/login',
      component: login
    },
    {
        name:'index',
        path:'/',
        component: index
      },
   
  ]
  
  let router = new VueRouter({
    routes
  })

  export default router