import Vue from 'vue'
import App from './App.vue'
import './assets/scss/style.scss'
import router from './router'
import './assets/iconfont/iconfont'
import './assets/iconfont/iconfont.css'


//全局部署轮播图参考文档
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

import Card from './components/Card'
Vue.component('m-card', Card)

import ListCard from './components/ListCard'
Vue.component('m-list-card', ListCard)

Vue.config.productionTip = false

//接口请求
import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api',
  // baseURL:'http://localhost:3000/web/api'
})


new Vue({ 
  router,
  render: h => h(App)
}).$mount('#app')
