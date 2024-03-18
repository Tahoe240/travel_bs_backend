// import Vue from 'vue'
// import App from './App.vue'
//
// Vue.config.productionTip = false
//
// new Vue({
//   render: h => h(App),
// }).$mount('#app')
// 引入Vue和必要的库
import Vue from 'vue'
import VueParticles from 'vue-particles'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'

import qs from "qs"
Vue.prototype.$qs = qs;
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload);

Vue.use(ElementUI)
Vue.use(VueParticles)


Vue.prototype.$axios = axios

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
