import Vue from 'vue'
import VueI18n from 'vue-i18n'
import locales from './locales/index'
import { getItem } from '@/utils/storage'
Vue.use(VueI18n)
export default new VueI18n({
  locale: getItem('locale') ? getItem('locale') : 'uz_crl',
  fallbackLocale: 'uz_crl',
  messages: locales,
  silentTranslationWarn:true

})
