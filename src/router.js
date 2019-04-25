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
import goodslist from "./components/goodslist.vue"    //引入商品列表
import category from "./components/categorylist.vue"  //引入分类参数
import goodscategoru from "./components/goodscategory.vue"     //引入商品分类
import orderlist from "./components/orderlist.vue"     //引入订单列表
import datalist from "./components/datareport.vue"     //引入数据报表
import rolelist from "./components/rolelist.vue"       //引入角色列表
import permission from "./components/permission.vue"   //引入权限管理列表


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
      },
      {
        path: 'goodslist',
        component: goodslist,
      },
      {
        path: 'category',
        component: category,
      },
      {
        path: 'goodscategoru',
        component: goodscategoru,
      },
      {
        path: 'orderlist',
        component: orderlist,
      },
      {
        path: 'datalist',
        component: datalist,
      },
      {
        path: 'rolelist',
        component: rolelist,
      },
      {
        path: 'permission',
        component: permission,
      },

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
