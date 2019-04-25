import Vue from "vue";

//导入路由
import VueRouter from "vue-router"
Vue.use(VueRouter);

// 导入相关组件
// 导入组件
import login from "./components/login.vue"            //登陆页
import index from "./components/index.vue"            //首页
import error from "./components/error.vue"            //错误页面
import users from "./components/users.vue"            //用户管理页
let routes = [
  {
    path: "/login",
    component: login
  },
  {
    path: "/",
    component: index,
    children:[
      {
        path: '',
        component: users,
      }
    ]
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
