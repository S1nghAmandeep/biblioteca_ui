import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/books',
      name: 'books',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/bookview/BooksView.vue')
    },
    {
      path: '/borrow-books',
      name: 'borrow-books',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BorrowBooksView.vue')
    },
    {
      path: '/people-account',
      name: 'people-account',
      component: () => import('../views/accountView/AccountView.vue')
    }
  ]
})

export default router
