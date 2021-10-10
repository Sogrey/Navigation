import {
    createApp
} from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import MyPlugin from './utils/MyPlugin'
import App from './App.vue'

const app = createApp(App)
app.use(VueAxios, axios)
// app.use(MyPlugin)
app.mount('#app')