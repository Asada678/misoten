import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import animateCss from 'animate.css'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.config.productionTip = false
Vue.use(animateCss);
Vue.use(Vue2TouchEvents)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
