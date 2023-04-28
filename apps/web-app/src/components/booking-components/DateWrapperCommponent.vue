<template>
  <div class="ms-2 me-2">
    <span class="date-title">
      {{
        props.date.toLocaleDateString('fr-FR', { weekday: 'short', month: 'long', day: 'numeric' })
      }}
    </span>
    <div class="d-flex flex-column mt-2">
      <template v-for="(slot, index) in props.timeSlots" :key="index">
        <SlotComponent
          :label="slot.hour"
          :startDate="props.date"
          :isLost="isTimeLost(slot.hour)"
          :isBooked="state.slotsBooked.find((el) => el == slot.hour) ? true : false"
          :newDateBooked="props.newDateBooked"
          @bookASlot="emits('bookASlot', $event)"
          @cancelNewDate="emits('cancelNewDate')"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import SlotComponent from './SlotComponent.vue'

interface Slot {
  id: string
  hour: string
}
const props = defineProps<{
  date: Date
  bookedDate: any[]
  timeSlots: { id: string; hour: string }[]
  newDateBooked: { startDate: Date; hour: string } | null
}>()

const state = reactive<{
  slotsBooked: any[]
  now: Date
}>({
  slotsBooked: [],
  now: new Date()
})

const emits = defineEmits<{
  (event: 'bookASlot', slot: { startDate: Date; hour: string }): void
  (event: 'cancelNewDate'): void
}>()

function isBooked(date: Date) {
  const dateToCompare = date.toISOString().split('T')[0]
  props.bookedDate.forEach((el) => {
    if (el.startDate.split('T')[0] === dateToCompare) {
      el.hour.forEach((hour: any) => {
        state.slotsBooked.push(hour)
      })
    }
  })
}

function isTimeLost(hour: string) {
  const hourToCompare = hour.split(':')[0]
  if (
    parseInt(hourToCompare) <= state.now.getHours() &&
    state.now.getDate() === props.date.getDate() &&
    state.now.getMonth() === props.date.getMonth()
  ) {
    return true
  }
  return false
}
isBooked(props.date)
</script>

<style scoped lang="scss">
.date-title {
  font-size: 1rem;
  font-weight: bold;
}
</style>
