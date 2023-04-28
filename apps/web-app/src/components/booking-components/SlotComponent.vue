<template>
  <p :class="`slot slot-${setClass()}`" @click="slotClicked()">{{ props.label }}</p>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const props = defineProps<{
  label: string
  startDate: Date
  isLost: boolean
  isBooked: boolean
  newDateBooked: { startDate: Date; hour: string } | null
}>()
const state = reactive<{
  isOpen: boolean
  isNewDateBooked: boolean
}>({
  isOpen: false,
  isNewDateBooked: false
})
function setClass() {
  if (props.isLost) {
    return 'lost'
  }
  if (props.isBooked) {
    return 'booked'
  }
  state.isOpen = true
  if (
    props.newDateBooked?.startDate === props.startDate &&
    props.newDateBooked?.hour === props.label
  ) {
    return 'new-date'
  }
  return 'open'
}

function slotClicked() {
  if (!state.isOpen) return
  if (state.isNewDateBooked) {
    state.isNewDateBooked = false
    emits('cancelNewDate')
  } else {
    state.isNewDateBooked = true
    emits('bookASlot', { startDate: props.startDate, hour: props.label })
  }
}

const emits = defineEmits<{
  (event: 'bookASlot', slot: { startDate: Date; hour: string }): void
  (event: 'cancelNewDate'): void
}>()
</script>

<style scoped lang="scss"></style>
