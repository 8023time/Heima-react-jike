import axios from "axios";
import { use_token } from "./token";


const request = axios.create({
    baseURL:'http://geek.itheima.net',
    timeout:10000,
    headers:{
        'Content-Type':'application/json;charset=utf-8'
    }
})


// 请求拦截器
request.interceptors.request.use(config=>{
    const token = use_token.get_token()
    if(token){
        config.headers.Authorization = `Bearer ${token}` // 将token添加到请求头
    }
    return config
},error=>{
    return Promise.reject(error)
})


// 响应拦截器
request.interceptors.response.use(res=>{
    return res.data
},error=>{
    return Promise.reject(error)
})


export default request