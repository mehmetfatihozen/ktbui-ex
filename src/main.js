import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import CircularCountDownTimer from "vue-circular-count-down-timer"
import LiquorTree from 'liquor-tree'
import ability from './config/ability'
import {abilitiesPlugin, Can} from '@casl/vue'
import ToggleButton from 'vue-js-toggle-button'
import Vuelidate from 'vuelidate'
import VueTheMask from 'vue-the-mask'
import VueMoment from 'vue-moment'
import Multiselect from 'vue-multiselect'
import Paginate from 'vuejs-paginate'
import Viewer from 'v-viewer'
import vueMask from 'vue-jquery-mask'
import OtpInput from "@bachdgvn/vue-otp-input"
import './plugins/fontawesome'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import './assets/scss/main.scss'
import Default from './layouts/Default'
import Empty from './layouts/Empty'

Vue.config.productionTip = false
Vue.component("v-otp-input", OtpInput)
Vue.use(vueMask);
Vue.use(Viewer)
Vue.use(VueTheMask)
Vue.use(Vuelidate)
Vue.use(ToggleButton)
Vue.use(abilitiesPlugin, ability)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(LiquorTree)
Vue.use(VueMoment)
Vue.use(CircularCountDownTimer)
Vue.component('default-layout', Default)
Vue.component('empty-layout', Empty)
Vue.component('Can', Can)
Vue.component('multiselect', Multiselect)
Vue.component('paginate', Paginate)
Vue.directive('uppercase', {
  update(el) {
    const sourceValue = el.value;
    const newValue = sourceValue.toUpperCase();

    if (sourceValue !== newValue) {
      el.value = newValue;
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }
  },
});
window.ability = ability
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
