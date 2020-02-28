import { LocalStorage, SessionStorage } from 'quasar'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      title: "Login"
    },
    beforeEnter(to, from, next) {
      const token = localStorage.getItem('token')
      if (token) {
        next()
      } else {
        next({ path: 'login' })
      }
    },
    children: [
      { path: '', component: () => import('pages/Dashboard.vue') },
    ]
  },
  {
    path: '/books',
    component: () => import('layouts/MainLayout.vue'),

    beforeEnter(to, from, next) {
      const token = localStorage.getItem('token')
      if (token) {
        next()
      } else {
        next({ path: 'login' })
      }
    },
    children: [

      { path: '', component: () => import('pages/Books.vue'),
        meta: {
          title: "Books"
        },
      }
    ]
  },
  {
    path: '/students',
    meta: {
      title: "Students"
    },
    beforeEnter(to, from, next) {
      const token = localStorage.getItem('token')
      if (token) {
        next()
      } else {
        next({ path: 'login' })
      }
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Students.vue') }
    ]
  },
  {
    path: '/barrowed',
    beforeEnter(to, from, next) {
      const token = localStorage.getItem('token')
      if (token) {
        next()
      } else {
        next({ path: 'login' })
      }
    },
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      title: "Barrowed Books"
    },
    children: [
      { path: '', component: () => import('pages/BarrowedBooks.vue') }
    ]
  },
  {
    path: '/search',
    beforeEnter(to, from, next) {
      const token = localStorage.getItem('token')
      if (token) {
        next()
      } else {
        next({ path: 'login' })
      }
    },
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      title: "Search Books"
    },
    children: [
      { path: '', component: () => import('pages/SearchBooks.vue') }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('layouts/LoginLayout.vue'),
    meta: {
      title: "Login"
    },
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      title: "Login"
    },
    children: [
      { path: '', component: () => import('pages/Users.vue') }
    ]
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      title: "Login"
    },
    children: [
      { path: '', component: () => import('pages/Settings.vue') }
    ]
  },
  {
    path: '/audit-trail',
    name: 'audit-trail',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      title: "Login"
    },
    children: [
      { path: '', component: () => import('pages/AuditTrail.vue') }
    ]
  },
  {
    path: '/reports',
    name: 'reports',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      title: "Login"
    },
    children: [
      { path: '', component: () => import('pages/Reports.vue') }
    ]
  }
]


// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
