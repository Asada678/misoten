import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import animateCss from 'animate.css'
import Vue2TouchEvents from 'vue2-touch-events'
import 'swiper/swiper-bundle.css';

// common components
import NormalButton from './components/common/NormalButton'
import FloatButton from './components/common/FloatButton'
import NormalDialog from './components/common/NormalDialog'
import Textarea from './components/common/Textarea'
import TextForm from './components/common/TextForm'

Vue.config.productionTip = false
Vue.use(animateCss);
Vue.use(Vue2TouchEvents)

Vue.component('m-button', NormalButton);
Vue.component('float-button', FloatButton);
Vue.component('m-dialog', NormalDialog);
Vue.component('m-textarea', Textarea);
Vue.component('m-form', TextForm);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
