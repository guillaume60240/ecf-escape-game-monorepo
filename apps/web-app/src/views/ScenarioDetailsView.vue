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
            <div class="scenario-description">{{ state.scenario.description }}</div>
            <div class="info-container">
              <p>
                Nombre de joueurs: de {{ state.scenario.minPlayers }} à
                {{ state.scenario.maxPlayers }}
              </p>
              <p>Durée: environ {{ state.scenario.duration }} mins</p>
              <p>Difficulté: {{ state.scenario.difficulty }}/10</p>
            </div>
          </div>
        </div>
        <div class="d-flex flex-column align-items-center justify-content-center ms-xl-5 wrapper">
          <RouterLink :to="{ name: 'booking', params: { id: state.scenario.id } }"
            ><button>Réserver</button></RouterLink
          >
          <div class="mt-5">
            <h3>Les autres scénarios</h3>
            <template v-for="(scenario, index) in state.otherScenarios" :key="index">
              <RouterLink :to="{ name: 'scenarios', params: { id: scenario.id } }">{{
                scenario.title
              }}</RouterLink>
            </template>
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
</template>
<script setup lang="ts">
import {
  getAllScenarios,
  getOneScenarioById
} from '@/services/api-request/scenario-manager/scenario-request'
import { getRecordByscenarioId } from '@/services/api-request/game-manager/game-request'
import { formatRecord } from '@/services/utils/format-data-utils'

import type { scenarioDto } from '@/dto/scenario.dto'
import { reactive, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import ScenarioImg from '@/components/HomeScenario/ScenarioImg.vue'

const router = useRouter()

const state = reactive<{
  scenario: scenarioDto
  isLoading: boolean
  scenarioId: string
  scenarioRecord: any
  otherScenarios: scenarioDto[]
}>({
  scenario: {} as scenarioDto,
  isLoading: true,
  scenarioId: router.currentRoute.value.params.id.toString(),
  scenarioRecord: null,
  otherScenarios: [] as scenarioDto[]
})

async function init() {
  state.scenario = await getOneScenarioById(state.scenarioId)
  const recordRequest = await getRecordByscenarioId(state.scenarioId)
  if (recordRequest) {
    state.scenarioRecord = formatRecord(recordRequest)
  } else {
    state.scenarioRecord = null
  }
  state.otherScenarios = []
  const allScenarios = await getAllScenarios()
  allScenarios.map((scenario) => {
    if (scenario.id != state.scenarioId) {
      state.otherScenarios.push(scenario)
    }
  })
  state.isLoading = false
}

init()

watchEffect(() => {
  if (state.scenarioId != router.currentRoute.value.params.id.toString()) {
    state.scenarioId = router.currentRoute.value.params.id.toString()
    state.isLoading = true
    init()
  }
})
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

.scenario-description {
  margin: 0 auto;
  text-align: center;
  font-size: 14px;
  text-align: justify;
  text-justify: inter-character;
}

.info-container {
  margin-top: 2rem;
  color: var(--primary-500);
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
