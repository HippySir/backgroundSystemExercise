// 导入axios
import axios from "axios";

//导入router模块
import router from "../../router"; 

// 将axios封装成为插件导出去
export default {
  install: function(vue) {
    // 设置基地址
    axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1";

    // 将发送请求的方法挂载到原型上面
    vue.prototype.$axios = axios;
    axios.defaults.headers.common[
      "Authorization"
    ] = sessionStorage.getItem("token");
    // 设置请求拦截器，
    axios.interceptors.request.use(
      function(config) {
        // console.log(config);
        // 在这里验证浏览器有没有token
        // if (!sessionStorage.getItem("token")) {
        //   this.$router.push({ path: "/login" });
        //   this.$message.error("请先登录！");
        //   return false;
        // } else {
        // }
        // Do something before request is sent
        return config;
      },
      function(error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    // 设置响应拦截器，对每一次回来的数据进行提示
    axios.interceptors.response.use(
      response => {
        vue.prototype.$message(response.data.meta.msg);
        if(response.data.meta.status === 400 && response.data.meta.msg === '无效token'){
          vue.prototype.$message({
            message: '小子你牛逼呀，竟然伪造token,滚回器登陆！',
            type: 'success'
          });
          router.push('/login');
        }
        return response;
      },
      function(error) {
        // Do something with response error

        return Promise.reject(error);
      }
    );
  }
};
