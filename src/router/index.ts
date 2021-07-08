import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/public/Home.vue'
import Login from '../views/admin/Login.vue'
import NewSite from '../views/admin/sites/NewSite.vue'



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin/sites/new',
    name: 'NewSite',
    component: NewSite
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
