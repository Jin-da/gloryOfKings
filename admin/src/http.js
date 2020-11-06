import axios from 'axios' //14.4K(gzipped: 5.1K)
import  Vue from 'vue'
import router from './router'
const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/admin/api',
  // baseURL:'http://localhost:3000/admin/api'
})

//添加请求头 用于校验是否登录
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (localStorage.token) {//如果有token再书写请求头 以避免没有请求头导致的后面执行的程序出问题
    config.headers.Authorization = 'Bearer ' + (localStorage.token || '')//前面加earer为规范
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


//全局捕获 添加捕获器(全部错误走这)
http.interceptors.response.use(res => {
  return res
},err => {
  //console.log(err.response);//输出错误的对象 根据此来选出message
  //使用vue 引入
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    if(err.response.status === 401) {//401则跳转到登录页
      router.push('/login')
    }
  }
  return Promise.reject(err)
})

export default http