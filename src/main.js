import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import animateCss from 'animate.css'
import Vue2TouchEvents from 'vue2-touch-events'
import 'swiper/swiper-bundle.css';
import Vuelidate from 'vuelidate'


// common components
import Datepicker from "@/components/common/Datepicker";
import ErrorMessage from './components/common/ErrorMessage'
import FloatButton from './components/common/FloatButton'
import FormGroup from './components/common/FormGroup'
import Header from './components/common/Header'
import NormalButton from './components/common/NormalButton'
import NormalDialog from './components/common/NormalDialog'
import RadioButton from './components/common/RadioButton'
import SelectBox from './components/common/SelectBox'
import Textarea from './components/common/Textarea'
import TextForm from './components/common/TextForm'

Vue.config.productionTip = false
Vue.use(animateCss);
Vue.use(Vue2TouchEvents);
Vue.use(Vuelidate);

Vue.component('m-button', NormalButton);
Vue.component('m-datepicker', Datepicker);
Vue.component('float-button', FloatButton);
Vue.component('m-dialog', NormalDialog);
Vue.component('m-error-message', ErrorMessage);
Vue.component('m-form', TextForm);
Vue.component('m-form-group', FormGroup);
Vue.component('m-header', Header);
Vue.component('m-radio', RadioButton);
Vue.component('m-select', SelectBox);
Vue.component('m-textarea', Textarea);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
