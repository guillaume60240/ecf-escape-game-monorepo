<script setup lang="ts">
import CarouselComponent from '@/components/carousel/CarouselComponent.vue'
import WrapperComponent from '@/components/HomeScenario/WrapperComponent.vue'

import { reactive } from 'vue'

import type { scenarioDto } from '@/dto/scenario.dto'

import { getAllScenarios } from '@/services/api-request/scenario-manager/scenario-request'
const state = reactive<{
  scenarios: scenarioDto[]
  isLoading: boolean
}>({
  scenarios: [],
  isLoading: true
})

async function init() {
  state.scenarios = await getAllScenarios()
  state.isLoading = false
}

init()
</script>

<template>
  <main>
    <CarouselComponent />
    <div class="row justify-content-around container mt-2" v-if="!state.isLoading">
      <template v-for="(scenario, index) in state.scenarios" :key="index">
        <WrapperComponent :scenario="scenario" class="col-12 col-lg-5 mt-4" />
      </template>
    </div>
    <div v-else class="mt-5 d-flex justify-content-center align-items-center flex-column">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
      <p class="mt-3">Chargement de la page...</p>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
