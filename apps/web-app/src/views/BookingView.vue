<template>
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
        <div class="d-flex flex-column align-items-center justify-content-center ms-xl-5 wrapper">
          <button>Réserver</button>
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
</template>
<script setup lang="ts">
import { getOneScenarioById } from '@/services/api-request/scenario-manager/scenario-request'

import type { scenarioDto } from '@/dto/scenario.dto'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { getRecordByscenarioId } from '@/services/api-request/game-manager/game-request'
import { getBookedDateForPeriodByScenarioId } from '@/services/api-request/booking-manager/booking-request'
import ScenarioImg from '@/components/HomeScenario/ScenarioImg.vue'

const router = useRouter()

const state = reactive<{
  scenario: scenarioDto
  isLoading: boolean
  scenarioId: string
  scenarioRecord: any
  datesBooked: any[]
  startPeriod: Date
}>({
  scenario: {} as scenarioDto,
  isLoading: true,
  scenarioId: router.currentRoute.value.params.id.toString(),
  scenarioRecord: null,
  datesBooked: [] as any[],
  startPeriod: new Date()
})

async function init() {
  state.scenario = await getOneScenarioById(state.scenarioId)
  console.log(await getBookedDateForPeriodByScenarioId(state.scenarioId, state.startPeriod))
  const recordRequest = await getRecordByscenarioId(state.scenarioId)
  if (recordRequest) {
    state.scenarioRecord = formatRecord(recordRequest)
  } else {
    state.scenarioRecord = null
  }
  state.isLoading = false
}

init()

function formatRecord(duration: any) {
  const array = duration.duration.split(':')
  const hours = parseInt(array[0])
  const minutes = parseInt(array[1])
  const seconds = parseInt(array[2])
  return {
    duration: `${hours}h ${minutes}m ${seconds}s`
  }
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
</style>
