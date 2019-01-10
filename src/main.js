import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { CONFIG as config } from './config.js'
import Axios from 'axios'
import Vue from 'vue'
import router from './router'
import App from './App.vue'


Vue.config.productionTip = false

Object.defineProperty(Vue.prototype, '$conf', { value: config });
Vue.prototype.$http = Axios;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

