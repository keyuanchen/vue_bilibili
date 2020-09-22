import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import Vant from "vant"
import "vant/lib/index.css"
import request from '@/utils/request'


Vue.prototype.$axios = request

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")