// 调用供应商管理接口
import request from '@/utils/request'

export function getTable(token) {
  return request({
    url: '/FormulaController/queryStandardFormula',
    method: 'post',
    params: { token }
  })
}

export function querySupplier(token) {
  return request({
    url: '/supplierController/querySupplier',
    method: 'post',
    params: { token }
  })
}

export function updateGYS(data) {
  return request({
    url: '/supplier/updateGYS',
    method: 'post',
    data
  })
}

export function addGYS(data) {
  return request({
    url: '/supplier/addGYS',
    method: 'post',
    data
  })
}

export function deleteGYS(data) {
  return request({
    url: '/supplier/deleteGYS',
    method: 'post',
    data
  })
}
