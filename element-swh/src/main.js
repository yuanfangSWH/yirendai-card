import Vue from 'vue'
//axios
import axios from 'axios'
Vue.prototype.axios = axios
//jquery
import $ from 'jquery'
//Vuex
import Vuex from 'vuex'
import store from './vuex/store'
//element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, {
  size: 'small'//组件尺寸
});
//路由
import router from './router/index.js'
//资源
import './assets/css/index.css'
//封装的axios方法
import api from './fetch/api'
Vue.prototype.api = api
//容器
import App from './App.vue'

Vue.use(Vuex)
Vue.use(api)
Vue.use(ElementUI)


new Vue({
  el: '#app',
  store,
  router, // 注入到根实例中
  render: h => h(App)
})