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
import { useRouter } from 'vue-router'
import { bookNewDate } from '@/services/api-request/booking-manager/booking-request'

const router = useRouter()
const bookingStore = useBookingStore()
const userStore = useUserStore()
const state = reactive<{
  booking: any //Partial<BookingDto>
  bookingStatus: 'success' | 'danger' | 0
  statusMessage: string
}>({
  booking: useBookingStore().getBooking(),
  bookingStatus: 0,
  statusMessage: ''
})

const emits = defineEmits<{
  (event: 'openLoginModal'): void
  (event: 'bookingDone', statut: 'success' | 'danger', message: string): void
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

async function registerNewBookingDate() {
  const user = userStore.getUser()
  if (!user.accesToken) {
    emits('openLoginModal')
  } else {
    const request = await bookNewDate(
      new Date(state.booking.startDate),
      state.booking.hour,
      state.booking.players,
      state.booking.price,
      +user.id,
      state.booking.scenarioId,
      user.accesToken
    )
    if (request === 201) {
      state.bookingStatus = 'success'
      state.statusMessage = 'Votre réservation a bien été enregistrée'
    } else {
      state.bookingStatus = 'danger'
      state.statusMessage =
        'Une erreur est survenue lors de la réservation. Merci de réessayer ultérieurement.'
    }
    emits('bookingDone', state.bookingStatus, state.statusMessage)
    if (request === 201) router.push({ name: 'home' })
  }
}

watchEffect(() => {
  if (
    !state.booking.startDate ||
    !state.booking.hour ||
    !state.booking.players ||
    !state.booking.price
  ) {
    router.push({ name: 'home' })
  }
})
</script>

<style scoped lang="scss">
.alert {
  position: absolute;
  top: 1rem;
  right: 2rem;
}
</style>
