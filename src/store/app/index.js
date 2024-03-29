import i18n from '@/i18n'
import { getItem, setItem } from '@/utils/storage'
const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  changeLocale({ commit }, locale) {
    i18n.locale = locale
    setItem('locale', locale)
    return locale
  }
}

export default {
  namespaced: true,
  actions
}
