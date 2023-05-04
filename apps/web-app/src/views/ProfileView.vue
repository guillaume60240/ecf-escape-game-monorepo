<template>
  <div>
    <main v-if="!state.bookedDateIsLoading">
      <h2>Espace personnel</h2>
      <h4>Bonjour {{ state.user.name }}</h4>
      <p>Voici vos réservations</p>
      <div v-if="state.userBookedDate">
        <div v-for="(date, index) in state.userBookedDate" :key="index">
          <div>{{ date.scenarioTitle }}</div>
          <div>{{ new Date(date.startDate).toLocaleDateString() }} à {{ date.hour }}</div>
          <div>Pour {{ date.players }} joueurs</div>
          <div>Prix: {{ date.price }}</div>
          <div v-if="new Date(date.startDate) > new Date()">
            <button
              class="btn btn-danger"
              @click="deleteBookedDate(date)"
              :disabled="new Date(date.startDate) < add24Hours(new Date())"
            >
              Annuler
            </button>
          </div>
          <hr />
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
import { useRouter } from 'vue-router'
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

<style scoped lang="scss"></style>
