import request from '@/utils/request'
export function login(data) {
    return request({
        url: 'auth/login',
        method: 'post',
        data
    })
}
export function loginKadrlar(data) {
    return request({
        url: 'login/kadrlar',
        method: 'post',
        data
    })
}