// 调用供应商管理接口
import { getTable, querySupplier, updateGYS, addGYS, deleteGYS } from '@/api/supplier'
import { getToken, removeToken } from '@/utils/auth'
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
    var qybh = storage.getItem('QYBH')
    return new Promise((resolve, reject) => {
      axios.post('/CustomerController/querySupplierByCustomer', { qybh: qybh }
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

  querySupplier({ commit, state }) {
    return new Promise((resolve, reject) => {
      querySupplier(state.token).then(response => {
        const { data } = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  updateGYS({ commit, state }, data) {
    const { SupplierName, EnterCode, Buyer, Property, CompanyName, Abbreviation, Postcode, Grade, Address, Deactivate } = data
    return new Promise((resolve, reject) => {
      updateGYS({ SupplierName: SupplierName, EnterCode: EnterCode, Buyer: Buyer, Property: Property,
        CompanyName: CompanyName, Abbreviation: Abbreviation, Postcode: Postcode, Grade: Grade, Address: Address,
        Deactivate: Deactivate }).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  addGYS({ commit, state }, data) {
    const { SupplierName, EnterCode, Buyer, Property, CompanyName, Abbreviation, Postcode, Grade, Address, Deactivate } = data
    return new Promise((resolve, reject) => {
      addGYS({ SupplierName: SupplierName, EnterCode: EnterCode, Buyer: Buyer, Property: Property,
        CompanyName: CompanyName, Abbreviation: Abbreviation, Postcode: Postcode, Grade: Grade, Address: Address,
        Deactivate: Deactivate }).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteGYS({ commit, state }, data) {
    const { SupplierName, EnterCode, Buyer, Property, CompanyName, Abbreviation, Postcode, Grade, Address, Deactivate } = data
    return new Promise((resolve, reject) => {
      deleteGYS({ SupplierName: SupplierName, EnterCode: EnterCode, Buyer: Buyer, Property: Property,
        CompanyName: CompanyName, Abbreviation: Abbreviation, Postcode: Postcode, Grade: Grade, Address: Address,
        Deactivate: Deactivate }).then(response => {
        resolve()
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
