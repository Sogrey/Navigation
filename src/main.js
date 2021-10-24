import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import axios from 'axios'

import './assets/css/style.css'

// import { SVG } from "@svgdotjs/svg.js";
// import {
//   random,
//   map,
//   spline,
//   pointsInPath
// } from '@georgedoescode/generative-utils'
// import tinycolor from 'tinycolor2'
// import {svgFilter} from '@svgdotjs/svg.filter.js'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

// Vue.prototype.$SVG = SVG
// Vue.prototype.$tinycolor = tinycolor
// Vue.prototype.$svgFilter = svgFilter

Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app')