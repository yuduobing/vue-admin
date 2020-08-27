//登录退出调用接口
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import Cookies from "js-cookie";
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    QYBH: '',
    QYMC: '',
    CQYLX: '',
    MENUS: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (sate, avatar) => {
    state.avatar = avatar
  },
  SET_QYBH: (state, QYBH) => {
    state.QYBH = QYBH
  },
  SET_QYMC: (state, QYMC) => {
    state.QYMC = QYMC
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_CQYLX: (state, CQYLX) => {
    state.CQYLX = CQYLX
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { account, password } = userInfo

    return new Promise((resolve, reject) => {
      axios.post('/userController/verifyLogin', { account: account.trim(), password: password.trim() }, {timeout: 5000})
        .then(response => {
          var data=response.data.data
              console.log(response.data.status)

          console.log('token=====>' + data.token)
          commit('SET_CQYLX', data.CQYLX)
          commit('SET_TOKEN', data.token)
          commit('SET_QYBH', data.QYBH)
          commit('SET_QYMC', data.QYMC)


          if (response.data.status === '1') {
            Message({
              message: "登陆成功",
              type: 'success',
              duration: 2* 1000
            })
          }
          var storage = window.sessionStorage
          storage.setItem('QYBH', data.QYBH)
          storage.setItem('CQYLX', data.CQYLX)
          storage.setItem('qydz', data.dz)
          storage.setItem('token', data.token)
          window.sessionStorage.setItem('number', 1)

          //设置宽长
          console.log("长宽"+JSON.stringify(data))
          Cookies.set('gg',data.gg)
          setToken(data.token)
          resolve()

        })
        .catch((error) => {
          if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
            Message({
              showClose: true,
              type: 'error',
              message: '请求服务器超时,请稍后再试'
            })
            reject()        // reject这个错误信息
          }
          else {
            Message({
              showClose: true,
              type: 'error',
              message: '帐号密码错误'
            })}

          reject()
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      var storage = window.sessionStorage
      var role = storage.getItem('CQYLX')
      var menu = []
      axios.post('/ModuleController/queryModule', {
        role: role
      }).then(res => {
        menu = res.data.data.module
        console.log("返回的菜单"+JSON.stringify(res.data))
        commit('SET_MENUS', menu)
        storage.setItem('menus', menu)
        resolve(menu)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
        removeToken() // 必须先删除令牌
        resetRouter()
        dispatch('tagsView/delAllViews', null, { root: true })
        commit('RESET_STATE')
        sessionStorage.clear()
        resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // 必须先删除令牌
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
