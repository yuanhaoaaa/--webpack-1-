import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let Home = () => import('@/view/home')
let Test = () => import('@/view/test')

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/test',
      component: Test
    }
  ]
})
