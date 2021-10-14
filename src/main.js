import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import './assets/css/normalize.min.css'
import './assets/plugins/font-awesome-4.7.0/css/font-awesome.min.css'
import './assets/css/style.css'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
}).$mount('#app')
