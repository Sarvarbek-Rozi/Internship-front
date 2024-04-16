import { login, logout } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'

export const actions = {
  // user login
  login({ commit }, credientials) {
    return new Promise((resolve, reject) => {
      login(credientials)
        .then(res => {
          const result = res.result
          commit('SET_USER', result.user)
          commit('SET_USER_TOKEN', result.access_token)
          commit('SET_IS_AUTH', true)
          setToken(result.access_token)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(res => {
          commit('SET_USER_TOKEN', '')
          commit('SET_IS_AUTH', false)
          removeToken()
          resolve(res)
        }).catch(err => {
          reject(err)
        })
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_USER_TOKEN', '')
      commit('SET_IS_AUTH', false)
      removeToken()
      resolve()
    })
  },
  setUserToken({ commit }, token) {
    return new Promise(resolve => {
      commit('SET_USER_TOKEN', token)
      resolve(true)
    })
  },

  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(res => {
          if (res.success === true) {
            commit('SET_USER', res.result.user)
            commit('SET_IS_AUTH', true)
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
