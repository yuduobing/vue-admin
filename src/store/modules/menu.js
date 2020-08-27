// 调用菜单管理接口
import { getTable, getMenuKh, getMenuKh1 } from '@/api/menu'
import { getToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'
import axios from 'axios'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    menus: []
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
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MENUS: (state, MENUS) => {
    state.MENUS = MENUS
  }
}

const actions = {

  getMenu({ commit, state }) {
    return new Promise((resolve, reject) => {
      var storage = window.sessionStorage
      var role = storage.getItem('CQYLX')
      var menu = []
      axios.post('/ModuleController/queryModule', {
        role: role
      }).then(res => {
        menu = res.data.data.module
        commit('SET_MENUS', menu)
        storage.setItem('menus', menu)
        resolve(menu)
      }).catch(function(error) {
        console.log(error)
      })
    })
  },

  // get Table info
  getTable({ commit, state }) {
    return new Promise((resolve, reject) => {
      getTable(state.token).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getMenuKh({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      getMenuKh(data).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getMenuKh1({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      getMenuKh1(data).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
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
