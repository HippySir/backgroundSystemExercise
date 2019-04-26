// 导入axios
import axios from 'axios'

// 将axios封装成为插件导出去
export default {
    install: function (vue) {
        // 设置基地址
        axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1';
    
        // 将发送请求的方法挂载到原型上面
        vue.prototype.$axios = axios;
     
        
    }
}