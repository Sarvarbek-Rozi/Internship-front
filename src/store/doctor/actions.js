import {  index,show,store,destroyDoctor,edit,update, } from '@/api/doctor'
import DoctorShow from "@/views/doctors/show.vue";
export const actions = {
    loadDoctor({ commit }, res) {
        commit('SET_DOCTOR', res.result.doctor)
    },
    index({ commit }, query) {
        return new Promise((resolve, reject) => {
            index(query).then(res => {
                commit('SET_DOCTORS', res.result.doctors)
                resolve(res)
            }).catch(error => {
                reject(error)
            })
        })
    },
    show({ commit }, doctor_user_id) {
        return new Promise((resolve, reject) => {
            show(doctor_user_id).then(res => {
                commit('SET_DOCTOR', res.result.doctor)
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
        // data.passport = data.passport.replace(' ', '')
        return new Promise((resolve, reject) => {
            store(data)
                .then(res => {
                    resolve(res)
                }).catch((res) => { reject(res) })
        })
    },
        delete({ commit }, id) {
        return new Promise((resolve, reject) => {
                destroyDoctor(id)
                .then(res => {
                    resolve(res)
                }).catch((res) => {
                reject(res)
            })
        })
    },
    update({ commit }, data) {
        return new Promise((resolve, reject) => {
            update(data)
                .then(res => {
                    resolve(res)
                }).catch(res => {
                reject(res)
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
    setForm({ commit }, { form, doctor }) {
        form.id = doctor.id
        form.name = doctor.user.name
        form.email = doctor.user.email
        form.password = doctor.user.password
        form.region_id = doctor.region_id
        form.city_id = doctor.city_id
        form.disease_id = doctor.disease_id
        form.description = doctor.description
    },


}
