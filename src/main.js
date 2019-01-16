import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { CONFIG as config } from './config.js'
import Axios from 'axios'
import Paginate from 'vuejs-paginate'
import Rx from 'rxjs/Rx'
import VueRx from 'vue-rx'
import Vue from 'vue'
import router from './router'
import App from './App.vue'

Vue.prototype.$eventBus = new Vue()

Vue.config.productionTip = false

Object.defineProperty(Vue.prototype, '$conf', { value: config });
Vue.prototype.$http = Axios;

Vue.use(VueRx, Rx)

// register pagination globally.
Vue.component('paginate', Paginate)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

