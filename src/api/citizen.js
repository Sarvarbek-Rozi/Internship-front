import request from '@/utils/request'

export function index(query) {
    return request({
        url: 'citizens',
        method: 'get',
        params: query
    })
}

export function show(id) {
    return request({
        url: 'citizens/show/' + id,
        method: 'get'
    })
}

export function store(data) {
    return request({
        url: 'citizens/store',
        method: 'post',
        data
    })
}

export function edit(id) {
    return request({
        url: 'citizens/show/' + id,
        method: 'get'
    })
}

export function update(data) {
    return request({
        url: 'citizens/update/' + data.id,
        method: 'put',
        data: data
    })
}

export function destroyCitizen(id) {
    return request({
        url: 'citizens/destroy/' + id,
        method: 'delete'
    })
}
export function getPassport(data) {
    return request({
        url: 'citizens/passport',
        method: 'post',
        data: data
    })
}

