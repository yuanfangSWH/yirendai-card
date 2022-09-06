import Vue from 'vue'
import App from './App'
import router from './router'
//axios
import axios from 'axios'
//设置axios为form-data
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.transformRequest = [function (data) {
//     let ret = ''
//     for (let it in data) {
//       ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//     }
//     return ret
// }]
Vue.prototype.axios = axios
//element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, {
  size: 'small'//组件尺寸
});
//v-charts图表插件-按需引入了-折线图
import VeLine from 'v-charts/lib/line.common'
Vue.component(VeLine.name, VeLine)
//资源
import './assets/css/index.css'
//封装的axios方法
import api from './api/api'
Vue.prototype.api = api
Vue.use(api)
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
