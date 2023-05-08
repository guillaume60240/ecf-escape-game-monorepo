<template>
  <div class="w-100">
    <main v-if="!state.bookedDateIsLoading" class="w-100 p-4">
      <h2 class="text-center">Espace personnel</h2>
      <h4 class="text-center">Bonjour {{ state.user.name }}</h4>
      <p class="text-center">Voici vos réservations</p>
      <div v-if="state.userBookedDate" class="row justify-content-around container mt-2">
        <div
          v-for="(date, index) in state.userBookedDate"
          :key="index"
          class="col-12 col-lg-5 mt-4"
        >
          <RouterLink :to="{ name: 'scenarios', params: { id: date.scenarioId } }"
            ><h5>{{ date.scenarioTitle }}</h5></RouterLink
          >
          <div>{{ new Date(date.startDate).toLocaleDateString() }} à {{ date.hour }}</div>
          <div>Pour {{ date.players }} joueurs</div>
          <div>Prix: {{ date.price }} €</div>
          <div v-if="new Date(date.startDate) > new Date()">
            <button
              class="btn btn-danger"
              @click="deleteBookedDate(date)"
              :disabled="new Date(date.startDate) < add24Hours(new Date())"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Vous n'avez pas de réservation</p>
      </div>
    </main>
    <div v-else class="mt-5 d-flex justify-content-center align-items-center flex-column">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
      <p class="mt-3">Chargement de la page...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import type { BookingDto } from '../dto/booking.dto'
import {
  deleteBookedDateByUserId,
  getBookedDateByUserId
} from '../services/api-request/booking-manager/booking-request'
import { useUserStore } from '@/stores/user'
import type { userDto } from '@/dto/user.dto'

const router = useRouter()
const userStore = useUserStore()

const state = reactive<{
  user: userDto
  userId: number
  userBookedDate: BookingDto[]
  bookedDateIsLoading: boolean
}>({
  userId: +router.currentRoute.value.params.id,
  userBookedDate: [] as BookingDto[],
  bookedDateIsLoading: true,
  user: userStore.getUser()
})

async function init() {
  state.userBookedDate = await getBookedDateByUserId(state.userId, state.user.accesToken)
  state.bookedDateIsLoading = false
}

init()

async function deleteBookedDate(date: BookingDto) {
  if (date.userId != state.user.id) return
  await deleteBookedDateByUserId(date.id, state.user.accesToken)
  state.userBookedDate = await getBookedDateByUserId(state.userId, state.user.accesToken)
}

// on ajoute 24 heures à la date pour avoir la date du lendemain
function add24Hours(date: Date) {
  return new Date(date.getTime() + 24 * 60 * 60 * 1000)
}
</script>

<style scoped lang="scss">
a {
  color: var(--text-nav);
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  font-size: 14px;
  font-weight: regular;

  &:hover {
    color: var(--text-nav-active);
  }
}
</style>
