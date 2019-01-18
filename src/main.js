import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { CONFIG as config } from './config.js'
import Axios from 'axios'
import Paginate from 'vuejs-paginate'
import Rx from 'rxjs/Rx'
import VueRx from 'vue-rx'
import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

Vue.prototype.$eventBus = new Vue()

Vue.config.productionTip = false

Object.defineProperty(Vue.prototype, '$conf', { value: config });

// set default language
store.dispatch('preference/getInitLangAction')

// set default param
Axios.defaults.params = {}
Axios.defaults.params['api_key'] = config.API_KEY;
Axios.defaults.params['language'] = store.state.preference.checkedLang;

Vue.prototype.$http = Axios;

Vue.use(VueRx, Rx)

// register pagination globally.
Vue.component('paginate', Paginate)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

