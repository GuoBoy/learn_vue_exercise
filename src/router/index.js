import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: '/welcome',
    children: [
      { path: 'welcome', component: () => import('../components/Welcome.vue') },
      { path: 'users', component: () => import('../components/users/Users.vue') },
      { path: "authority", component: () => import('../components/power/authority.vue') },
      { path: 'character', component: () => import('../components/power/character.vue') },
      { path: 'categories', component: () => import('../components/goods/Categories.vue') },
      { path: 'list', component: () => import('../components/goods/List.vue') },
      { path: 'list/add', component: () => import('../components/goods/Add.vue') }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: () => import('../components/Login.vue')
  },
  {
    path: '*',
    name: "other",
    redirect: '/login'
  }
]

const router = new VueRouter({
  routes
})
// 路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪个路径跳转来
  // next 函数，表示放行
  //    next() 放行  next('/login')放行重定向
  if (to.path === '/login') return next()
  // const token = window.sessionStorage.getItem("token")
  const token = "sd"
  if (!token) return next('/login')
  next()
})

export default router
