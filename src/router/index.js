import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import { useMainStore } from '@/stores/mainStore';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        const mainStore = useMainStore();
        if (mainStore.isLoged) {
          next('/'); // Se non è autenticato, reindirizza alla pagina di login
        } else {
          next(); // Se è autenticato, permetti l'accesso alla rotta
        }
      },
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('../views/bookview/BooksView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/borrow-books',
      name: 'borrow-books',
      component: () => import('../views/BorrowBooksView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/customer-account',
      name: 'customer-account',
      component: () => import('../views/customerview/CustomerView.vue'),
      meta: { requiresAuth: true } // Proteggi anche questa rotta
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    }
  ],
});


// // Guard globale per proteggere le rotte
// router.beforeEach((to, from, next) => {
//   const mainStore = useMainStore(); // Accedi allo store di Pinia

//   // Se la rotta richiede autenticazione
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!mainStore.isLoged) {
//       next('/'); // Se non è loggato, reindirizza al login
//     } else {
//       next(); // Se è loggato, permetti l'accesso
//     }
//   }
// });

export default router;
