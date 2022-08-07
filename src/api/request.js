import axios from 'axios'
// 引入仓库
import store from '@/store'
// 引入token函数
import {
    getToken
} from '@/utils/toekn'
import router from '@/router';
// axios二次封装
const requests = axios.create({
    // 基于哪个路径
    baseURL: "/api",
    // 请求在5秒内没有响应 ，请求失败
    timeout: 5000,
    // headers:{
    //     "Content-Type": "application/json", //默认请求头为它
    // }
});
// 请求拦截器，在发起请求前，请求拦截器可以检测到，在请求发出去之前做一些事
requests.interceptors.request.use((config) => {
    // 将token带给服务器
    if (getToken()) {
        config.headers.common['Authorization'] = getToken()
    }
    // config配置对象，header请求头重要
    return config;
})
// 响应拦截器,发出请求后，有进度条
requests.interceptors.response.use((res) => {
    // 成功的回调函数
    return res.data;
}, (error) => {
    // 响应失败的回调
    return Promise.reject(new Error('faile'))
});
export default requests;