import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../Views/HomeView.vue'
import AboutView from '../Views/AboutView.vue'
import LoginView from '../Views/LoginView.vue'
import AccessDeniedView from '../Views/AccessDeniedView.vue'
import AddBook from '../views/AddBook.vue'
import AddBookView from '../views/AddBookView.vue'
import { useAuth } from '../composables/useAuth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDeniedView
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { authenticated } = useAuth()

  if (to.meta.requiresAuth && !authenticated.value) {
    next('/access-denied')
  } else {
    next()
  }
})

export default router
