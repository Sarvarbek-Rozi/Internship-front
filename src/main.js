import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/scss/main.scss'
import i18n from './i18n'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import lang from './assets/lang/uz-cyril-UZ'
import locale from 'element-ui/lib/locale'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective)

Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
locale.use(lang)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
