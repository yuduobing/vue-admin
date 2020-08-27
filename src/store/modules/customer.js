// 调用客户管理接口
import { getTable, updateKh } from '@/api/customer'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'
import { MessageBox, Message } from 'element-ui'
import axios from 'axios'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
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
  }
}

const actions = {
  getTable({ commit, state }) {
    var storage = window.sessionStorage
    var supplierId = storage.getItem('QYBH')
    return new Promise((resolve, reject) => {
      axios.post('/supplierController/queryCustomerBySupplier', JSON.stringify({ supplierId: supplierId })
      )
        .then(response => {
          const { data } = response.data
          resolve(data)
        })
        .catch(() => {
          Message({
            showClose: true,
            type: 'error',
            message: 'Ajax error'
          })
        })
    })
  },
  updateKh({ commit, state }, data) {
    const { lTYBZ } = data
    var storage = window.sessionStorage
    var qybh = storage.getItem('QYBH')
    return new Promise((resolve, reject) => {
      axios.post('/supplierController/updateCustomer', JSON.stringify({ qybh: qybh, tybz: lTYBZ })
      ).then(response => {
        resolve()
      }).catch(() => {
        this.$message({
          showClose: true,
          type: 'error',
          message: 'Ajax error'
        })
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
