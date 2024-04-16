import request from '@/utils/request'

export function index(query) {
  return request({
    url: 'application',
    method: 'get',
    params: query
  })
}

export function show(id) {
  return request({
    url: 'application/show/' + id,
    method: 'get'
  })
}
export function showCode(id) {
  return request({
    url: 'application/show/' + id,
    method: 'get'
  })
}
export function phone(phone) {
  return request({
    url: 'application/getCode/' + phone,
    method: 'get'
  })
}

export function confirm(data) {
  return request({
    url: 'application/confirm-sms',
    method: 'post',
    data
  })
}
export function store(data) {
  return request({
    url: 'application/store',
    method: 'post',
    data
  })
}

export function edit(id) {
  return request({
    url: 'application/show/' + id,
    method: 'get'
  })
}

export function confirmapplication(id) {
  return request({
    url: 'application/confirm/' + id,
    method: 'put'
  })
}

export function update(data) {
  return request({
    url: 'application/update/' + data.id,
    method: 'put',
    data: data
  })
}
export function checkStatusApplication(query) {
  return request({
    url: 'application/check-status-application',
    method: 'get',
    params: query
  })
}



export function passport(data) {
  return request({
    url: 'application/passport',
    method: 'post',
    data: data
  })
}
export function updateStatusAction(data) {
  return request({
    url: 'application/update/' + data.id,
    method: 'put',
    data
  })
}
