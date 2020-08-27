// 映射方法
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import customer from './modules/customer'// 映射，将action中得到动作映射为vue中的方法
import tagsView from './modules/tagsView'
import supplier from './modules/supplier'
import menu from './modules/menu'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    tagsView,
    user,
    customer,
    supplier,
    menu
  },
  getters
})

export default store
