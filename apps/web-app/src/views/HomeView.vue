<script setup lang="ts">
import CarouselComponent from '@/components/carousel/CarouselComponent.vue'
import WrapperComponent from '@/components/HomeScenario/WrapperComponent.vue'

import { reactive } from 'vue'

import type { scenarioDto } from '@/dto/scenario.dto'

import { getAllScenarios } from '@/services/api-request/scenario-manager/scenario-request'
const state = reactive<{
  scenarios: scenarioDto[]
}>({
  scenarios: []
})

async function getSceanrios() {
  state.scenarios = await getAllScenarios()
}

getSceanrios()
</script>

<template>
  <main>
    <CarouselComponent />
    <div class="row justify-content-around container mt-2">
      <template v-for="(scenario, index) in state.scenarios" :key="index">
        <WrapperComponent :scenario="scenario" class="col-12 col-lg-5 mt-4" />
      </template>
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
