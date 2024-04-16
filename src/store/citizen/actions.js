import { show, edit, update, index, store,getPassport, destroyCitizen } from '@/api/citizen'
export const actions = {
  loadCitizen({ commit }, res) {
    commit('SET_CITIZEN', res.result.citizen)
  },
  index({ commit }, query) {
    return new Promise((resolve, reject) => {
      index(query).then(res => {
        commit('SET_CITIZENS', res.result.citizens)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  indexFull({}, query) {
    return new Promise((resolve, reject) => {
      index(query).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  show({ commit }, citizen_id) {
    return new Promise((resolve, reject) => {
      show(citizen_id).then(res => {
        commit('SET_CITIZEN', res.result.citizen)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  edit({ commit }, id) {
    return new Promise((resolve, reject) => {
      edit(id)
        .then(res => {
          resolve(res)
        })
    })
  },
  store({ commit }, { data }) {
    data.birth_date = data.birth_date.split('.').reverse().join('-')
    return new Promise((resolve, reject) => {
      store(data)
        .then(res => {
          resolve(res)
        }).catch((res) => { reject(res) })
    })
  },
  update({ commit }, data) {
      data.passport = data.passport.replace(' ', '')
      data.birth_date = data.birth_date.split('.').reverse().join('-')
    return new Promise((resolve, reject) => {
      update(data)
        .then(res => {
          resolve(res)
        }).catch(res => {
          reject(res)
        })
    })
  },
  delete({ commit }, id) {
    return new Promise((resolve, reject) => {
      destroyCitizen(id)
        .then(res => {
          resolve(res)
        }).catch((res) => {
          reject(res)
        })
    })
  },
    getPassport({ commit }, data) {
        return new Promise((resolve, reject) => {
            getPassport(data)
                .then(res => {
                    if (res.success === false) {
                        reject(res)
                    } else {
                        resolve(res)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    },

  setForm({ commit }, { form, citizen }) {
      if (citizen.id) {
          form.id = citizen.id
          form.birth_date = citizen.birth_date.split('-').reverse().join('.')
          form.first_name = citizen.first_name
          form.passport = citizen.passport
          form.last_name = citizen.last_name
          form.address = citizen.address
          form.phone = citizen.phone
          form.diseases_id = citizen.diseases_id
          form.patronymic = citizen.patronymic
          form.tin = citizen.tin
          form.region_id = citizen.region_id
          form.city_id = citizen.city_id
      }else{
          form.birth_date = citizen.birth_date
          form.first_name = citizen.first_name
          form.last_name = citizen.last_name
          form.patronymic = citizen.patronymic
      }
  },

}
