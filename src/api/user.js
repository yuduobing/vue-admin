// 调用登录接口
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/userController/verifyLogin',
    method: 'post',
    data
  })
}
export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/userController/quitUser',
    method: 'post'
  })
}
// 本地mock数据接口
// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
