import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 一般
import Home from '../views/public/sites/Home.vue'
import SiteIndex from '../views/public/sites/Index.vue'
import SiteShow from '../views/public/sites/Show.vue'
import TagShow from '../views/public/tags/Show.vue'
import TagIndex from '../views/public/tags/Index.vue'
import ArticleNew from '../views/public/articles/New.vue'
import ArticleIndex from '../views/public/articles/Index.vue'


import Login from '../views/public/Login.vue'
import Signup from '../views/public/Signup.vue'



// 管理人用
import AdminLogin from '../views/admin/Login.vue'
import AdminNewSite from '../views/admin/sites/NewSite.vue'
import AdminIndexSite from '../views/admin/sites/Index.vue'
import AdminShowSite from '../views/admin/sites/Show.vue'
import AdminEditSite from '../views/admin/sites/Edit.vue'





const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'SiteIndex',
    component: SiteIndex
  },
  {
    path: '/sites/:id',
    name: 'SiteShow',
    component: SiteShow
  },
  {
    path: '/tags',
    name: 'TagIndex',
    component: TagIndex
  },
  {
    path: '/tags/:id',
    name: 'TagShow',
    component: TagShow
  },
  {
    path: '/articles/new',
    name: 'ArticleNew',
    component: ArticleNew
  },
  {
    path: '/articles',
    name: 'ArticleIndex',
    component: ArticleIndex
  },

  // 管理人用
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/admin/sites/new',
    name: 'AdminNewSite',
    component: AdminNewSite
  },
  {
    path: '/admin/sites',
    name: 'AdminIndexSite',
    component: AdminIndexSite
  },
  {
    path: '/admin/sites/:id',
    name: 'AdminShowSite',
    component: AdminShowSite
  },
  {
    path: '/admin/sites/:id/edit',
    name: 'AdminEditSite',
    component: AdminEditSite
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
