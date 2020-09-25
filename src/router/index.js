import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',    //历史模式   
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/nav',
      name: 'nav',
      // 懒加载组件
      component: () => import('../pages/Nav'),
      children: [
        // 首页
        { path: '/nav/main', name: '/nav/main', component: () => import('../pages/nav/Main') },
        // 订单管理
        { path: '/nav/order', name: '/nav/order', component: () => import('../pages/nav/Order') },
        // 商品列表
        { path: '/nav/orderlist', name: '/nav/orderlist', component: () => import('../pages/nav/OrderList') },
        // 商品添加
        { path: '/nav/orderadd', name: '/nav/orderadd', component: () => import('../pages/nav/OrderAdd') },
        // 商品分类
        { path: '/nav/ordersort', name: '/nav/ordersort', component: () => import('../pages/nav/OrderSort') },
        // 店铺管理
        { path: '/nav/store', name: '/nav/store', component: () => import('../pages/nav/Store') },
        // 账号列表
        { path: '/nav/accountlist', name: '/nav/accountlist', component: () => import('../pages/nav/AccountList') },
        // 添加账号
        { path: '/nav/accountadd', name: '/nav/accountadd', component: () => import('../pages/nav/AccountAdd') },
        // 修改密码
        { path: '/nav/changepassword', name: '/nav/changepassword', component: () => import('../pages/nav/ChangePassword') },
        // 商品统计
        { path: '/nav/productstatistics', name: '/nav/productstatistics', component: () => import('../pages/nav/ProductStatistics') },
        // 订单统计
        { path: '/nav/orderstatistics', name: '/nav/orderstatistics', component: () => import('../pages/nav/OrderStatistics') },
        // 管理员
        { path: '/nav/admin', name: '/nav/admin', component: () => import('../pages/nav/Admin') },
      ]
    }
  ]
})
