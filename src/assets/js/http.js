// 导入axios
import axios from 'axios'

// 将axios封装成为插件导出去
export default {
    install: function (vue) {
        // 设置基地址
        axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1';
    
        // 将发送请求的方法挂载到原型上面
        vue.prototype.$axios = axios;

        // 设置响应拦截器，对每一次回来的数据进行提示
        axios.interceptors.response.use( (response) => {
            vue.prototype.$message(response.data.meta.msg);
            return response;
          }, function (error) {
            // Do something with response error
            
            return Promise.reject(error);
          });
     
        
    }
}