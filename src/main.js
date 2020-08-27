import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import {
  codemirror
} from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'
import XEAjax from 'xe-ajax'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import 'font-awesome/css/font-awesome.min.css'
import VXETablePluginShortcutKey from 'vxe-table-plugin-shortcut-key'
import 'vxe-table-plugin-element/dist/style.css'
import VXETablePluginElement from 'vxe-table-plugin-element'
Vue.use(VXETable)
XEAjax.setup({
  headers: {
    'Content-Type': 'application/json'
  }
})
Vue.use(VueAxios, axios)
axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.prototype.$ajax = XEAjax
VXETable.use(VXETablePluginElement)
VXETable.use(VXETablePluginShortcutKey, {
  setting: {
    'table.edit.leftTabMove': 'Shift + Enter',
    'table.edit.rightTabMove': 'Enter' // 将 Tab 键的按键值修改为回车键
  }
})

// 本地mock数据
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }
import Multiselect from 'vue-multiselect' // Vue-multiselect
Vue.component('multiselect', Multiselect)

// if (module.hot) { // 热更新
//   module.hot.accept()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
Vue.use(ElementUI, {
  size: 'small'
})
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(codemirror)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
