<template>
  <div class="d-flex flex-column flex-xl-row align-items-center justify-contents-between">
    <Transition mode="out-in">
      <Suspense>
        <div
          class="d-flex flex-column flex-xl-row align-items-center section"
          v-if="!state.isLoading"
        >
          <div class="wrapper justify-content-center me-xl-5">
            <ScenarioImg
              :imgUrl="state.scenario.imgUrl"
              :alt="state.scenario.title"
              class="scenarioImg"
            />
            <span v-if="state.scenarioRecord" class="record-banner"
              >Record: {{ state.scenarioRecord.duration }}</span
            >
            <div class="info-wrapper">
              <h1>{{ state.scenario.title }}</h1>
            </div>
          </div>

          <div class="d-flex justify-content-center align-items-center flex-column date-container">
            <div class="d-flex justify-content-between align-items-center w-100">
              <button @click="goToLastDate" :disabled="chechIfLastIsPossible()">
                <i class="bi bi-caret-left-fill me-2"></i>Prédent</button
              ><button @click="goToNextDate">
                Suivant<i class="bi bi-caret-right-fill ms-2"></i>
              </button>
            </div>
            <div class="date-zone">
              <div v-for="(date, index) in state.period" :key="index">
                <DateWrapperCommponent
                  :date="date"
                  :timeSlots="state.timeSlots"
                  :bookedDate="state.datesBooked.bookingDate"
                  :newDateBooked="state.newDateBooked"
                  @bookASlot="bookASlot($event)"
                  @cancelNewDate="state.newDateBooked = null"
                  v-if="!state.dateIsLoading"
                />
                <DateWrapperComponentLoader v-else :timeSlots="state.timeSlots" />
              </div>
            </div>
            <!-- <div class="d-flex justify-content-around align-items-center w-100">
              <p class="slot slot-booked">Indisponible</p>
              <p class="slot slot-open">Disponible</p>
            </div> -->
            <PriceWrapperComponent
              :prices="state.prices"
              :minPlayers="state.scenario.minPlayers"
              :maxPlayers="state.scenario.maxPlayers"
              @selectPlayersNumber="setPriceInfo($event)"
            />
            <div
              class="d-flex flex-column align-items-center justify-content-center ms-xl-5 wrapper"
            >
              <button
                :disabled="
                  state.newDateBooked &&
                  state.bookingPriceInfo != null &&
                  state.bookingPriceInfo.price != 0
                    ? false
                    : true
                "
                @click="sendNewBookedDate"
              >
                Réserver
              </button>
            </div>
          </div>
        </div>
        <div v-else class="mt-5 d-flex justify-content-center align-items-center flex-column">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Chargement...</span>
          </div>
          <p class="mt-3">Chargement de la page...</p>
        </div>
      </Suspense>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { getOneScenarioById } from '@/services/api-request/scenario-manager/scenario-request'
import { getRecordByscenarioId } from '@/services/api-request/game-manager/game-request'
import { getBookedDateForPeriodByScenarioId } from '@/services/api-request/booking-manager/booking-request'
import { getPrices } from '@/services/api-request/booking-manager/prices-request'
import { getAllTimeSlot } from '@/services/api-request/booking-manager/time-slot-request'
import { formatRecord } from '@/services/utils/format-data-utils'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingStore } from '@/stores/booking'
import type { scenarioDto } from '@/dto/scenario.dto'
import ScenarioImg from '@/components/HomeScenario/ScenarioImg.vue'
import DateWrapperCommponent from '@/components/booking-components/DateWrapperCommponent.vue'
import DateWrapperComponentLoader from '@/components/booking-components/DateWrapperComponentLoader.vue'
import PriceWrapperComponent from '@/components/booking-components/PriceWrapperComponent.vue'
import type { PricesDto } from '../dto/prices.dto'

const router = useRouter()

const state = reactive<{
  scenario: scenarioDto
  isLoading: boolean
  dateIsLoading: boolean
  scenarioId: number
  scenarioRecord: any
  datesBooked: BookingDate
  startPeriod: Date
  period: Date[]
  timeSlots: any[]
  newDateBooked: { startDate: Date; hour: string } | null
  prices: PricesDto[]
  bookingPriceInfo: { price: number; players: number } | null
}>({
  scenario: {} as scenarioDto,
  isLoading: true,
  dateIsLoading: true,
  scenarioId: +router.currentRoute.value.params.id,
  scenarioRecord: null,
  datesBooked: {} as BookingDate,
  startPeriod: new Date(),
  period: [],
  timeSlots: [],
  newDateBooked: null,
  prices: [],
  bookingPriceInfo: null
})

async function init() {
  state.scenario = await getOneScenarioById(state.scenarioId)
  const recordRequest = await getRecordByscenarioId(state.scenarioId)
  if (recordRequest) {
    state.scenarioRecord = formatRecord(recordRequest.duration)
  } else {
    state.scenarioRecord = null
  }
  initDates()
  state.prices = await getPrices()
  state.isLoading = false
}
async function initDates() {
  state.datesBooked = await getBookedDateForPeriodByScenarioId(state.scenarioId, state.startPeriod)
  if (!state.datesBooked.bookingDate.length) {
    state.datesBooked.bookingDate = []
  }
  state.timeSlots = await getAllTimeSlot()
  state.period = calcTreeDays()
  setTimeout(() => {
    state.dateIsLoading = false
  }, 300)
}
interface BookingDate {
  bookingDate: {
    hour: string[]
    startDate: Date
  }[]
  start: Date
  end: Date
}
init()

function calcTreeDays(): Date[] {
  const today = state.startPeriod
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const afterTomorrow = new Date(today)
  afterTomorrow.setDate(afterTomorrow.getDate() + 2)
  return [today, tomorrow, afterTomorrow]
}

function bookASlot(date: { startDate: Date; hour: string }) {
  state.newDateBooked = date
}

async function sendNewBookedDate() {
  if (!state.newDateBooked || !state.bookingPriceInfo?.players) return
  const newBooking = {
    startDate: state.newDateBooked.startDate,
    hour: state.newDateBooked.hour,
    scenarioId: state.scenarioId,
    scenarioTitle: state.scenario.title,
    players: state.bookingPriceInfo.players,
    price: state.bookingPriceInfo?.price
  }
  useBookingStore().setNewBooking(newBooking)
  router.push('/booking-confirmation')
}

function setPriceInfo(priceInfo: { price: number; players: number }) {
  state.bookingPriceInfo = priceInfo
}

/// pagination des date
function chechIfLastIsPossible() {
  const today = new Date().toISOString().split('T')[0]
  const thisperiodStart = state.startPeriod.toISOString().split('T')[0]

  if (today === thisperiodStart) {
    return true
  } else {
    return false
  }
}

function reinitializePropsDate() {
  state.timeSlots = []
  state.datesBooked = {} as BookingDate
}
async function goToLastDate() {
  state.dateIsLoading = true
  const startNewPeriod = new Date(state.startPeriod)
  startNewPeriod.setDate(startNewPeriod.getDate() - 3)
  state.startPeriod = new Date(startNewPeriod)
  state.newDateBooked = null
  reinitializePropsDate()
  initDates()
}
async function goToNextDate() {
  state.dateIsLoading = true
  state.startPeriod = new Date(state.datesBooked.end)
  state.newDateBooked = null
  reinitializePropsDate()
  initDates()
}
</script>

<style scoped lang="scss">
.section {
  max-width: 1280px;
  margin: 0 auto;
}
.wrapper {
  width: 100%;
  margin: 0;
  min-width: 50%;
  max-width: max-content;
  position: relative;
}
.scenarioImg {
  max-width: 700px;
  max-height: calc(100% * 0.5);
  object-fit: cover;
  padding: 0;
}
.record-banner {
  background-color: var(--success-500);
  color: var(--white);
  position: absolute;
  padding: 5px;
  top: 0;
  left: 0;
}
.info-wrapper {
  max-width: 700px;
  padding-left: 2rem;
  padding-right: 2rem;
}
h1 {
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

button {
  background-color: var(--primary-500);
  color: var(--white);
  border: none;
  border-radius: 15px;
  padding: 0.5rem 1rem;
  width: 140px;
  font-size: 12px;
  font-weight: 400;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  letter-spacing: 0.1rem;
}

a {
  color: var(--primary-500);
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  text-align: center;
}
.date-container {
  min-width: 360px;
  .date-zone {
    width: 100%;
    height: 450px;
    margin: 0 auto;
    padding: 1rem;
    background-color: var(--white);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
  }
}
</style>
