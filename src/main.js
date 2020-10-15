import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import animateCss from 'animate.css'
import Vue2TouchEvents from 'vue2-touch-events'

// common components
import NormalButton from './components/common/NormalButton'
import FloatButton from './components/common/FloatButton'
import NormalDialog from './components/common/NormalDialog'
import Textarea from './components/common/Textarea'
import TextForm from './components/common/TextForm'

Vue.config.productionTip = false
Vue.use(animateCss);
Vue.use(Vue2TouchEvents)

Vue.component('normal-button', NormalButton);
Vue.component('float-button', FloatButton);
Vue.component('normal-dialog', NormalDialog);
Vue.component('text-area', Textarea);
Vue.component('text-form', TextForm);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
