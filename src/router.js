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
    component: login,
    meta: { islogin: true }
  },
  {
    path: "/",
    component: index,
    children:[
      {
        path: 'users',
        component: users,
      },
      {
        path: 'goods',
        component: goodslist,
      },
      {
        path: 'params',
        component: category,
      },
      {
        path: 'categories',
        component: goodscategoru,
      },
      {
        path: 'orders',
        component: orderlist,
      },
      {
        path: 'reports',
        component: datalist,
      },
      {
        path: 'roles',
        component: rolelist,
      },
      {
        path: 'rights',
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

// 设置导航的前置守卫
router.beforeEach((to, from, next) => {
  if(to.meta.islogin === true){
    next();
  }else{
    if(window.sessionStorage.getItem('token')){
      next();
    }else{
      next('/login');
    }
  }
 
  
  // ...
})

export default router;
