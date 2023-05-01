import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      component: () => import('../views/ConfirmBookingView.vue')
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
