// 调用菜单管理接口
import request from '@/utils/request'

export function getTable() {
  return request({
    url: '/menu/gettable',
    method: 'post'
  })
}

export function getMenuKh(data) {
  return request({
    url: '/menu/getkh',
    method: 'post',
    data
  })
}
export function getMenuKh1(data) {
  return request({
    url: '/menu/getkh1',
    method: 'post',
    data
  })
}
