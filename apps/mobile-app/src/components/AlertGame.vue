<template>
  <div class="wrapper">
    <div :class="[state.timeOut ? 'danger' : 'success', 'chrono']">
      Durée de jeu : {{ state.chronoTime }}
    </div>
    <span class="alert" v-if="state.timeOut"></span>
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from "vue";
import { getScenarioById } from "@/services/api-request/scenario-manager/scenario-manager-request";

const props = defineProps<{
  game: {
    id: number;
    started_at: string;
    ended_at: string;
    duration: number;
    booking_id: number;
    scenario_id: number;
  }[];
}>();

const state = reactive<{
  chronoStart: number;
  scenario: {
    description: string;
    difficulty: number;
    duration: number;
    id: number;
    imgUrl: string;
    maxPlayers: number;
    minPlayers: number;
    title: string;
    summary: string;
  } | null;
  maxChrono: number;
  timeOut: boolean;
  chronoTime: string;
}>({
  chronoStart: 0,
  scenario: null,
  maxChrono: 0,
  timeOut: false,
  chronoTime: "",
});

function calcChronoStart() {
  const now = new Date();
  const startedAt = new Date(props.game[0].started_at);
  state.chronoStart = now.getTime() - startedAt.getTime();
}

function incrementChrono() {
  setTimeout(() => {
    state.chronoStart += 100;
    state.chronoTime = getChronoTime(state.chronoStart);
    if (state.chronoStart >= state.maxChrono) {
      state.timeOut = true;
    }
    incrementChrono();
  }, 100);
}

async function getScenario(id: number) {
  state.scenario = await getScenarioById(id);
  if (state.scenario != null) {
    state.maxChrono = state.scenario.duration * 60 * 1000;
    state.chronoTime = getChronoTime(state.chronoStart);
    calcChronoStart();
    incrementChrono();
  }
}
function getChronoTime(chronoStart: number) {
  const chronoTime = new Date(chronoStart);
  const hours = chronoTime.getHours();
  const minutes = chronoTime.getMinutes();
  const seconds = chronoTime.getSeconds();
  const milliseconds = chronoTime.getMilliseconds();
  return `${hours}h ${minutes}mins ${seconds}:${milliseconds}`;
}

watchEffect(async () => {
  if (props.game[0]?.scenario_id) {
    await getScenario(props.game[0].scenario_id);
  }
});
</script>

<style scoped lang="css">
.wrapper {
  position: relative;
}
.chrono {
  width: 300px;
}
.success {
  color: var(--ion-color-success);
}
.danger {
  color: var(--ion-color-danger);
}
.alert {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  margin-left: 10px;
  background-color: var(--ion-color-danger);
  animation-duration: 0.8s;
  animation-name: clignoter;
  animation-iteration-count: infinite;
  transition: none;
}
@keyframes clignoter {
  0% {
    opacity: 1;
  }
  40% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
