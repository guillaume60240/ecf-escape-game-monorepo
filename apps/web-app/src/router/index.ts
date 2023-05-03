import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getMe } from '@/services/api-request/user-manager/user-services'
import { useUserStore } from '@/stores/user'

async function verifyUser() {
  const userStore = useUserStore()
  const user = userStore.getUser()
  if (!user.accesToken) {
    return false
  } else {
    const userVerified = await getMe(user.accesToken, user.id, user.email, user.name)
    if (!userVerified) {
      return false
    } else {
      return true
    }
  }
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    } else {
      return {
        top: 0,
        behavior: 'smooth'
      }
    }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/scenarios/:id',
      name: 'scenarios',
      component: () => import('../views/ScenarioDetailsView.vue')
    },
    {
      path: '/booking/:id',
      name: 'booking',
      component: () => import('../views/BookingView.vue')
    },
    {
      path: '/booking-confirmation',
      name: 'booking-confirmation',
      component: () => import('../views/ConfirmBookingView.vue'),
      beforeEnter: async (to, from, next) => {
        const user = await verifyUser()
        if (!user) {
          const userStore = useUserStore()
          localStorage.removeItem('user')
          userStore.resetUser()
        }
        if (from.name !== 'booking') {
          next({ name: 'home' })
        } else {
          next()
        }
      }
    },
    {
      path: '/confidential-policies',
      name: 'confidential-policies',
      component: () => import('../views/PolitiqueView.vue')
    },
    {
      path: '/general-conditions',
      name: 'general-conditions',
      component: () => import('../views/GeneralConditionsView.vue')
    }
  ]
})

export default router
