<template>
  <div class="wrapper">
    <div class="d-flex mt-2">
      <ScenarioImg :imgUrl="props.scenario.imgUrl" :alt="props.scenario.title" />
      <p class="summary">{{ props.scenario.summary }}</p>
    </div>
    <h3>{{ props.scenario.title }}</h3>
    <div class="btn-container">
      <RouterLink :to="{ name: 'scenarios', params: { id: props.scenario.id } }"
        >Voir plus</RouterLink
      >
      <RouterLink :to="{ name: 'booking', params: { id: scenario.id } }">Réserver</RouterLink>
    </div>
    <div class="footer mb-2">
      <span>de {{ props.scenario.minPlayers }} à {{ props.scenario.maxPlayers }} joueurs</span>
      <span>Durée environ {{ props.scenario.duration }} mins</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { scenarioDto } from '@/dto/scenario.dto'

import ScenarioImg from '@/components/HomeScenario/ScenarioImg.vue'

const props = defineProps<{
  scenario: scenarioDto
}>()
</script>
<style scoped lang="scss">
.wrapper {
  background-color: var(--primary-500);
  color: var(--white);
  max-width: 600px;

  .summary {
    margin: 0 0 0 1rem;
    font-size: 12px;
    font-weight: 400;
    text-align: justify;
    text-justify: inter-character;
  }

  h3 {
    margin-bottom: 0.4rem;
    color: var(--white);
    font-weight: 200;
    line-height: 23px;
    text-align: center;
    margin-top: 1rem;
  }

  .btn-container {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
    margin-bottom: 1rem;

    a {
      background-color: var(--secondary-500);
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
    }
  }

  .footer {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
    font-size: 12px;
    font-weight: 400;
  }
}
</style>
