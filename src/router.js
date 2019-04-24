import Vue from "vue";

//导入路由
import VueRouter from "vue-router"
Vue.use(VueRouter);

// 导入相关组件
// 导入组件
import login from "./components/login.vue" //登陆页
import index from "./components/index.vue" //首页
import error from "./components/error.vue"  
let routes = [
  {
    path: "/login",
    component: login
  },
  {
    path: "/",
    component: index
  },
  {
    path: "/error",
    component: error
  },
];

let router = new VueRouter({
  routes
});

export default router;
