// 配置路由
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
/* Layout */
import Layout from '@/layout'
// const _import = require('./_import_development.js') // 获取组件的方法

const StaticRoutes = [
  // refresh刷新路由，重定向全局路由
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path(.*)',
      component: () => import('@/views/redirect/index')
    }]
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard', // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: {
        title: '首页',
        icon: 'dashboard',
        affix: true
      }
    }]
  },
  {
    path: '/registered',
    component: () => import('@/views/registered/index'),
    hidden: true
  },
  {
    path: '/updatePwd',
    component: () => import('@/views/updatePwd/index'),
    hidden: true
  }
]
export const constantRoutes = StaticRoutes
// export const constantRoutes = [
//   // refresh刷新路由，重定向全局路由
//   {
//     path: '/redirect',
//     component: Layout,
//     hidden: true,
//     children: [
//       {
//         path: '/redirect/:path(.*)',
//         component: () => import('@/views/redirect/index')
//       }
//     ]
//   },
//   {
//     path: '/auth-redirect',
//     component: () => import('@/views/login/authredirect'),
//     hidden: true
//   },
//   {
//     path: '/login',
//     component: () => import('@/views/login/index'),
//     hidden: true
//   },

//   {
//     path: '/404',
//     component: () => import('@/views/404'),
//     hidden: true
//   },
//   {
//     path: '/',
//     component: Layout,
//     redirect: '/dashboard', // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
//     children: [
//       {
//         path: 'dashboard',
//         component: () => import('@/views/dashboard/index'),
//         name: 'Dashboard',
//         meta: { title: '首页', icon: 'dashboard', affix: true }
//       }
//     ]
//   },

//   {
//     path: '/registered',
//     component: () => import('@/views/registered/index'),
//     hidden: true
//   },
//   {
//     path: '/updatePwd',
//     component: () => import('@/views/updatePwd/index'),
//     hidden: true
//   },

//   {
//     path: '/MenuManagement',
//     component: Layout,
//     meta: { title: '系统管理', icon: 'form', roles: ['admin', 'editor'] },
//     alwaysShow: true,
//     children: [{
//       path: '/menu',
//       name: 'menu',
//       component: () => import('@/views/menu/index'),
//       meta: { title: '菜单管理', icon: 'form', roles: ['admin', 'editor'] }
//     },
//     {
//       path: '/menuAuthority',
//       name: 'menuAuthority',
//       component: () => import('@/views/menu/menuAuthority/index'),
//       meta: { title: '分配客户', icon: 'form', roles: ['admin', 'editor'] },
//       hidden: true
//     }
//     ]
//   },
//   {
//     path: '/CustomerManage',
//     component: Layout,
//     alwaysShow: true,
//     meta: { title: '销售管理', icon: 'form', roles: ['admin', 'editor'] },
//     children: [{
//       path: '/Customer',
//       name: 'Customer',
//       component: () => import('@/views/customerManage/index'),
//       meta: { title: '客户管理', icon: 'form', roles: ['admin', 'editor'] }
//     },
//     {
//       path: '/updateKh',
//       name: 'updateKh',
//       component: () => import('@/views/customerManage/updateKh/index'),
//       meta: { title: '客户信息修改', icon: 'form', roles: ['admin', 'editor'] },
//       hidden: true
//     },
//     {
//       path: '/Supplier',
//       name: 'Supplier',
//       component: () => import('@/views/supplierManage/index'),
//       meta: { title: '供应商管理', icon: 'form' }
//     },
//     {
//       path: '/updateGYS',
//       name: 'updateGYS',
//       component: () => import('@/views/supplierManage/updateGYS/index'),
//       meta: { title: '供应商信息修改', icon: 'form' },
//       hidden: true
//     },
//     {
//       path: '/addGYS',
//       name: 'addGYS',
//       component: () => import('@/views/supplierManage/addGYS/index'),
//       meta: { title: '新增供应商信息', icon: 'form' },
//       hidden: true
//     }
//     ]
//   },
//   {
//     path: '/FormulaManage',
//     component: Layout,
//     alwaysShow: true,
//     meta: { title: '配方管理', icon: 'form' },
//     children: [
//       {
//         path: '/Formula',
//         name: 'Formula',
//         component: () => import('@/views/formulaManage/index'),
//         meta: { title: '配方配料管理', icon: 'form' }
//       },
//       {
//         path: '/khFormula',
//         name: 'khFormula',
//         component: () => import('@/views/formulaManage/khFormula/index'),
//         meta: { title: '客户配方管理', icon: 'form' }
//       }
//     ]
//   },
//   {
//     path: '/ZBPurchaseOdd',
//     component: Layout,
//     alwaysShow: true,
//     meta: { title: '采购管理', icon: 'form', roles: ['admin', 'editor'] },
//     children: [{
//       path: '/ZBPurchase',
//       name: 'ZBPurchase',
//       component: () => import('@/views/ZBPurchase/index'),
//       meta: { title: '纸板采购单', icon: 'form', roles: ['admin', 'editor'] }
//     },
//     {
//       path: '/addPurchase',
//       name: 'addPurchase',
//       component: () => import('@/views/ZBPurchase/addPurchase/index'),
//       meta: { title: '新增纸板采购单', icon: 'form', roles: ['admin', 'editor'] },
//       hidden: true
//     },
//     {
//       path: '/CheckCardboard',
//       name: 'CheckCardboard',
//       component: () => import('@/views/ZBPurchase/CheckCardboard/index'),
//       meta: { title: '审核纸板采购单', icon: 'form', roles: ['admin', 'editor'] },
//       hidden: true
//     },
//     {
//       path: '/ProductInformationManagement',
//       name: 'ProductInformationManagement',
//       component: () => import('@/views/ProductInformationManagement/index'),
//       meta: { title: '纸箱采购单', icon: 'form', roles: ['admin', 'editor'] }
//     },
//     {
//       path: '/CGDStatus',
//       name: 'CGDStatus',
//       component: () => import('@/views/CGDStatus/index'),
//       meta: { title: '采购单流程跟踪', icon: 'form', roles: ['admin', 'editor'] }
//     }
//     ]
//   },
//   {
//     path: '/OrderManage',
//     component: Layout,
//     alwaysShow: true,
//     meta: { title: '订单管理', icon: 'form', roles: ['admin', 'editor'] },
//     children: [{
//       path: '/ZBProductArchive',
//       name: 'ZBProductArchive',
//       component: () => import('@/views/ProductArchive/ZBProduct/index'),
//       meta: { title: '纸板产品档案', icon: 'form', roles: ['admin', 'editor'] }
//     },
//     {
//       path: '/ZXProductArchive',
//       name: 'ZXProductArchive',
//       component: () => import('@/views/ProductArchive/ZXProduct/index'),
//       meta: { title: '纸箱产品档案', icon: 'form', roles: ['admin', 'editor'] }
//     }
//     ]
//   },
//   // 404 page must be placed at the end !!!
//   { path: '*', redirect: '/404', hidden: true }
// ]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

router.$addRoutes = (params) => {
  router.matcher = new Router({
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  }).matcher
  // router.matcher = new Router().matcher
  router.addRoutes(params)
}

router.selfaddRoutes = function(params) {
  router.matcher = new Router().matcher
  router.addRoutes(params)
}

export default router
