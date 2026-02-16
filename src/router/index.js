import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import SignUpPage from '@/views/SignUpPage.vue'
import HomePage from '@/views/HomePage.vue'
import RecipesPage from '@/views/RecipesPage.vue'
import LandingPage from '@/views/LandingPage.vue'

function isLoggedIn() {
  return !!localStorage.getItem('token')
}

const routes = [
  { path: '/', name: 'LandingPage', component: LandingPage },
  { path: '/recipes', name: 'RecipesPage', component: RecipesPage, meta: { requiresAuth: true } },
  { path: '/signup', name: 'SignUp', component: SignUpPage },
  { path: '/login', name: 'LoginPage', component: LoginPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStr = localStorage.getItem('loggedInUser')
  const user = userStr ? JSON.parse(userStr) : null

  if (to.meta.requiresAuth && !user) {
    next('/login')
  } else {
    next()
  }
})

export default router
