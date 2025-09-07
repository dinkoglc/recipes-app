// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import HomePage from '@/views/HomePage.vue'
import RecipesPage from '@/views/RecipesPage.vue'
import LandingPage from '@/views/LandingPage.vue'

function isLoggedIn() {
  return !!localStorage.getItem('token') //  token pohrana nakon login-a
}

const routes = [
  { path: '/landing', name: 'LandingPage', component: LandingPage },
  { path: '/', name: 'RecipesPage', component: RecipesPage, meta: { requiresAuth: true } },
  { path: '/signup', name: 'SignUp', component: SignUpPage },
  { path: '/login', name: 'LoginPage', component: LoginPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// globalni guard
router.beforeEach((to, from, next) => {
  const userStr = localStorage.getItem('loggedInUser')
  const user = userStr ? JSON.parse(userStr) : null

  if (to.meta.requiresAuth && !user) {
    // ako ruta zahtijeva login a user nije prijavljen → login
    next('/login')
  } else {
    next()
  }
})

export default router
