import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url // api的base_url 读取config配置文件
  headers: {
    'Content-Type': 'application/json'
  },
  // withCredentials: true, // 跨域请求时发送Cookie
  timeout: 5000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做一些事情
    // var token = window.sessionStorage.getItem('token')
    // config.headers['token'] = token // 让每个请求携带自定义token
    if (store.getters.token) {
      config.headers['Token'] = store.getters.token // 让每个请求携带自定义token
    }
    return config
  },
  error => {
    // 做一些请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  /**
   * 如果要获取http信息（例如标题或状态）
   * Please return  response => response
  */

  /**
   * 通过自定义代码确定请求状态
   * 您还可以通过HTTP状态代码来判断状态
   */
  response => {
    const res = response.data
    console.log(res)
    if (res.status === '1') {
      return res
    } else {
      Message({
        message: res.error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    // code为非20000是抛错
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message || 'Error',
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //     // to re-login
    //     MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确认登出', {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //       store.dispatch('user/resetToken').then(() => {
    //         location.reload()// 为了重新实例化vue-router对象 避免bug
    //       })
    //     })
    //   }
    //   return Promise.reject(new Error(res.message || 'Error'))
    // } else {
    //   return res
    // }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
