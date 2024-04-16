import request from '@/utils/request'

export function index(query) {
    return request({
        url: 'doctors',
        method: 'get',
        params: query
    })
}
export function show(id) {
    return request({
        url: 'doctors/show/' + id,
        method: 'get'
    })
}
export function store(data) {
    return request({
        url: 'doctors/store',
        method: 'post',
        data
    })
}
export function destroyDoctor(id) {
    return request({
        url: 'doctors/destroy/' + id,
        method: 'delete'
    })
}
export function edit(id) {
    return request({
        url: 'doctors/show/' + id,
        method: 'get'
    })
}
export function update(data) {
    return request({
        url: 'doctors/update/' + data.id,
        method: 'put',
        data: data
    })
}