<template>
  <div>
    <select
      class="form-select form-select mb-3"
      aria-label=".form-select-lg example"
      name="PlayersNumber"
      @change="selectPlayersNumber($event.target.value)"
    >
      <option selected>Choississez le nombre de joueurs</option>
      <option v-for="player in state.authorizedPlayers" :key="player" :value="player">
        {{ player }}
      </option>
    </select>
    <div>
      <p>Prix : {{ state.playersNumberSelected ? state.price : '-' }} €</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PricesDto } from '@/dto/prices.dto'
import { reactive } from 'vue'

const props = defineProps<{
  prices: PricesDto[]
  minPlayers: number
  maxPlayers: number
}>()

const state = reactive<{
  authorizedPlayers: number[]
  playersNumberSelected: number
  price: number
}>({
  authorizedPlayers: [],
  playersNumberSelected: 0,
  price: 0
})

function init() {
  for (let i = props.minPlayers; i <= props.maxPlayers; i++) {
    state.authorizedPlayers.push(i)
  }
}

init()

function selectPlayersNumber(player: number) {
  state.playersNumberSelected = player
  calcPrice()
  emits('selectPlayersNumber', { players: state.playersNumberSelected, price: state.price })
}

function calcPrice() {
  props.prices.forEach((el) => {
    if (
      el.minPlayers <= state.playersNumberSelected &&
      el.maxPlayers >= state.playersNumberSelected
    ) {
      state.price = el.price * state.playersNumberSelected
    }
  })
}

const emits = defineEmits<{
  (event: 'selectPlayersNumber', priceInfo: { players: number; price: number }): void
}>()
</script>
