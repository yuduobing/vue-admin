// 调用客户管理接口
import request from '@/utils/request'

export function getTable(data) {
  return request({
    url: '/supplierController/queryCustomerBySupplier',
    method: 'post',
    data
  })
}

export function updateKh(params) {
  return request({
    url: '/supplierController/updateCustomer',
    method: 'post',
    params
  })
}
