<template>
  <div>
    <h2>Confirmation de réservation</h2>
    <p>Scénario: {{ state.booking.scenarioTitle }}</p>
    <p>Date: {{ displayDate(new Date(state.booking.startDate)) }}</p>
    <p>Heure: {{ state.booking.hour }}</p>
    <p>Joueurs: {{ state.booking.players }}</p>
    <p>Prix: {{ state.booking.price }}</p>
    <div class="d-flex justify-content-evenly align-items-center w-100">
      <button @click="deleteNewBookingDate()" class="btn btn-danger">Annuler</button>
      <button class="btn btn-primary" @click="registerNewBookingDate()">Valider</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBookingStore } from '@/stores/booking'
import { useUserStore } from '@/stores/user'
import { reactive, watchEffect } from 'vue'
import type { BookingDto } from '../dto/booking.dto'
import { useRouter } from 'vue-router'

const router = useRouter()
const bookingStore = useBookingStore()
const userStore = useUserStore()
const state = reactive<{
  booking: BookingDto
}>({
  booking: useBookingStore().getBooking()
})

const emits = defineEmits<{
  (event: 'openLoginModal'): void
}>()

const displayDate = (date: Date) => {
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function deleteNewBookingDate() {
  bookingStore.deleteBooking()
  state.booking = bookingStore.getBooking()
}

function registerNewBookingDate() {
  console.log('registerNewBookingDate')
  const user = userStore.getUser()
  console.log(user)
  if (!user.id) {
    console.log('no user')
    emits('openLoginModal')
  }
}

watchEffect(() => {
  if (!state.booking.startDate) {
    router.push({ name: 'home' })
  }
})
</script>