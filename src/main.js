import Vue from 'vue'
import {Vuelidate} from "vuelidate"
import VCalendar from "v-calendar"
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import dateFilter from './filters/date.filter'
//import './assets/css/style.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

Vue.use(IconsPlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.use(VCalendar)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
