// 权限管理
import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度栏样式
import {
  getToken
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
const _import = require('./router/_import_development.js') // 获取组件的方法
import Layout from '@/layout'
import axios from 'axios'
NProgress.configure({
  showSpinner: false
}) // NProgress配置

const whiteList = ['/login', '/auth-redirect', '/registered', '/updatePwd'] // 白名单
// var getRouter // 用来获取后台拿到的路由
// router.beforeEach((to, from, next) => {
//   NProgress.start()
//   if (getToken()) {
//     if (to.path === '/login') {
//       next({ path: '/' })
//       NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {
//       window.localStorage.clear()
//       next('/login')
//       NProgress.done()
//     }
//   }
//   if (!getRouter) { // 不加这个判断，路由会陷入死循环
//     if (!getObjArr('routers')) {
//       // getRouter = rouerConfig // 后台拿到路由
//       getRouter = JSON.parse(window.localStorage.getItem('routerslist')) // 后台拿到路由
//       if (!getRouter) {
//         console.log('没拿到返回数据')
//         return false
//       }
//       saveObjArr('routers', getRouter) // 存储路由到localStorage
//       routerGo(to, next) // 执行路由跳转方法
//       // axios.get('https://www.easy-mock.com/mock/5a5da330d9b48c260cb42ca8/example/antrouter').then(res => {
//       //   console.log(res)
//       //   getRouter = res.data.data.router//后台拿到路由
//       //   saveObjArr('routers', getRouter) //存储路由到localStorage
//       //   routerGo(to, next)//执行路由跳转方法
//       // })
//     } else { // 从localStorage拿到了路由
//       getRouter = getObjArr('routers') // 拿到路由
//       routerGo(to, next)
//     }
//   } else {
//     next()
//   }
// })

// function routerGo(to, next) {
//   getRouter = filterAsyncRouter(getRouter) // 过滤路由
//   router.addRoutes(getRouter) // 动态添加路由
//   global.antRouter = getRouter // 将路由数据传递给全局变量，做侧边栏菜单渲染工作
//   next({ ...to, replace: true })
// }

// function saveObjArr(name, data) { // localStorage 存储数组对象的方法
//   localStorage.setItem(name, JSON.stringify(data))
// }

// function getObjArr(name) { // localStorage 获取数组对象的方法
//   return JSON.parse(window.localStorage.getItem(name))
// }

// // 动态从后端获取生成路由表
function filterRouter(routers) { // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = routers.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') { // Layout组件特殊处理
        route.component = Layout
      } else {
        route.component = _import(route.component)
        // route.component = (resolve) => require(['../${route.component}.vue'], resolve)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterRouter(route.children)
    }
    return true
  })
  return accessedRouters
}

function removeChildren(routers) {
  for (var i = 0; i < routers.length; i++) {
    if (routers[i].children == null) {
      delete routers[i].children
    } else {
      var children = routers[i].children
      for (var j = 0; j < children.length; j++) {
        if (children[j].children === null) {
          delete children[j].children
        }
      }
    }
  }
  return routers
}

// 5.21
router.beforeEach(async(to, from, next) => {
  // 开始进度条

  NProgress.start()
  // 设置页面标题
  document.title = getPageTitle(to.meta.title)
  // 确定用户是否已登录
  const hasToken = getToken()
  if (hasToken) {

    if (to.path === '/login') {
      // 如果已登录，请重定向到主页
      next({
        path: '/'
      })
      console.log("第一次进入")
      NProgress.done()
    } else {
      console.log("第二次进入")
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          var qymc = store.getters.QYMC
          if (qymc === null || qymc.length < 1) {
            window.sessionStorage.removeItem('menus')
            global.antRouter = []
            next()
          }
          //解决刷新重进
          window.sessionStorage.removeItem('menus')
          global.antRouter = []
          var storage = window.sessionStorage
          var role = storage.getItem('CQYLX')
          var storageMenu = storage.getItem('menus')
          var menu = []
          if (storageMenu === null || storageMenu.length < 1) {
            await axios.post('/ModuleController/queryModule', {
              role: role
            }).then(function(res) {
              console.log(res)

              menu = res.data.data.module
              console.log(menu)
              const menu1 = [
                // 404 page must be placed at the end !!!
                {
                  path: '*',
                  redirect: '/404',
                  hidden: true
                }
              ]
              menu.push(menu1[0])
              storage.setItem('menus', menu)
              next()
            }).catch(function(error) {
              Message.error(error || 'Has Error')
            })
            menu = removeChildren(menu)
            const menus = filterRouter(menu) // 1.过滤路由
            router.$addRoutes(menus) // 2.动态添加路由
            global.antRouter = menus // 3.将路由数据传递给全局变量，做侧边栏菜单渲染工作
            next({
              ...to,
              replace: true
            }) // hack方法 确保addRoutes已完成 ,set the replace
          } else {
            global.antRouter = []
            next()
          }
          // next()
        } catch (error) {
          // remove token and go to login page to re-login
          // 删除令牌并进入登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // 其他无权访问的页面将重定向到登录页面
      next(`/login?redirect=${to.path}`) // 否则全部定向到登录页
      NProgress.done()
    }
  }

  // if (store.getters.token) { // 判断是否有token
  //   if (to.path === '/login') {
  //     next({
  //       path: '/'
  //     })
  //   } else {
  //     if (to.meta && to.meta.role) { // 判断即将进入的页面是否需要权限
  //       if (store.getters.roles.length !== 0) { // 判断当前用户是否已拉取完info信息
  //         if (hasPermission(store.getters.roles, to.meta.role)) { // 判断权限
  //           next() // 有权限
  //         } else {
  //           next({ path: '/404', query: { noGoBack: true }})// 无权限
  //         }
  //       } else { // 未拉取info信息
  //         store.dispatch('getInfo').then(() => { // 拉取info
  //           permission.init({// 初始化权限
  //             roles: store.getters.roles,
  //             router: router.option.routers
  //           })
  //           if (hasPermission(store.getters.roles, to.meta.role)) { // 判断权限
  //             next()// 有权限
  //           } else {
  //             next({ path: '/404', query: { noGoBack: true }})// 无权限
  //           }
  //         }).catch(err => {
  //           console.log(err)
  //         })
  //       }
  //     } else { // 页面不需要权限直接进入
  //       if (store.getters.roles.length !== 0) {
  // 		  next()
  // 	  } else {
  // 		  store.dispatch('GetInfo').then(() => {
  // 			  permission.init({
  // 				  roles: store.getters.roles,
  // 				  router: router.option.routers
  // 			  })
  // 			  next()
  // 		  }).catch(err => {
  // 			  console.log(err)
  // 		  })
  // 	  }
  //     }
  //   }
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
  //     next()
  //   } else {
  //     next('/login')// 否则全部重定向到登录页
  //     NProgress.done() // 在hash模式下，改变手动改变hash，重定向回来，不会触发afterEach，暂时hack方案 ps：history模式下无问题，可删除该行！
  //   }
  // }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
