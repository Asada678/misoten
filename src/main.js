import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import animateCss from 'animate.css'
import Vue2TouchEvents from 'vue2-touch-events'
import 'swiper/swiper-bundle.css';
import Vuelidate from 'vuelidate'
import VueCroppie from 'vue-croppie';
import 'croppie/croppie.css'


// common components
import Button from './components/common/Button'
import Chip from "@/components/common/Chip";
import Datepicker from "@/components/common/Datepicker";
import Dialog from './components/common/Dialog'
import DropZone from "@/components/common/DropZone";
import ErrorMessage from './components/common/ErrorMessage'
import FloatButton from './components/common/FloatButton'
import FormGroup from './components/common/FormGroup'
import Header from './components/common/Header'
import InputIcon from './components/common/InputIcon'
import RadioButton from './components/common/RadioButton'
import SelectBox from './components/common/SelectBox'
import Tab from './components/common/Tab'
import Tabs from './components/common/Tabs'
import TabContent from './components/common/TabContent'
import TabContents from './components/common/TabContents'
import Textarea from './components/common/Textarea'
import TextForm from './components/common/TextForm'

Vue.config.productionTip = false
Vue.use(animateCss);
Vue.use(Vue2TouchEvents);
Vue.use(Vuelidate);
Vue.use(VueCroppie);

Vue.component('m-button', Button);
Vue.component('m-chip', Chip);
Vue.component('m-drop-zone', DropZone);
Vue.component('m-datepicker', Datepicker);
Vue.component('float-button', FloatButton);
Vue.component('m-dialog', Dialog);
Vue.component('m-error-message', ErrorMessage);
Vue.component('m-form', TextForm);
Vue.component('m-form-group', FormGroup);
Vue.component('m-header', Header);
Vue.component('m-input-icon', InputIcon);
Vue.component('m-radio', RadioButton);
Vue.component('m-select', SelectBox);
Vue.component('m-tab', Tab);
Vue.component('m-tabs', Tabs);
Vue.component('m-tab-content', TabContent);
Vue.component('m-tab-contents', TabContents);
Vue.component('m-textarea', Textarea);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
