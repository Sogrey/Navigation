import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
// import jquery from 'jquery'
// import ElementUI from 'element-ui'
// import './assets/common.scss'
// import 'element-ui/lib/theme-chalk/index.css'
// import 'element-ui/lib/theme-chalk/display.css'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
// Vue.use(ElementUI)

new Vue({
  render: h => h(App),
}).$mount('#app')
