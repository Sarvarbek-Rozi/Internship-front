import request from '@/utils/request'
export function regions(query) {
    return request({
        url: 'resources/regions',
        method: 'get',
        params: query
    })
}
export function cities(query) {
    return request({
        url: 'resources/cities',
        method: 'get',
        params: query
    })
}
export function diseases(query) {
    return request({
        url: 'resources/diseases',
        method: 'get',
        params: query
    })
}
export function users(query) {
    return request({
        url: 'resources/users',
        method: 'get',
        params: query
    })
}