import {cities, regions, diseases,users} from "@/api/resource";
export const actions = {

regions({ commit }, data) {
    return new Promise((resolve, reject) => {
        regions(data).then(res => {
            commit('SET_REGIONS', res.result.regions)
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
},
cities({ commit }, data) {
    return new Promise((resolve, reject) => {
        cities(data).then(res => {
            commit('SET_CITIES', res.result.cities)
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
},
diseases({ commit }, data) {
    return new Promise((resolve, reject) => {
        diseases(data).then(res => {
            commit('SET_DISEASES', res.result.diseases)
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
},
users({ commit }, data) {
    return new Promise((resolve, reject) => {
        users(data).then(res => {
            commit('SET_USERS', res.result.users)
            resolve(res)
        }).catch(error => {
            reject(error)
        })
    })
},


}