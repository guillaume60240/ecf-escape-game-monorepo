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
          :isBooked="checkIfIsSlotBooked(slot.hour)"
          :newDateBooked="props.newDateBooked"
          @bookASlot="emits('bookASlot', $event)"
          @cancelNewDate="emits('cancelNewDate')"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import SlotComponent from './SlotComponent.vue'

const props = defineProps<{
  date: Date
  bookedDate: any[]
  timeSlots: { id: string; hour: string }[]
  newDateBooked: { startDate: Date; hour: string } | null
}>()

const state = reactive<{
  slotsBooked: any[]
  now: Date
  startDate: Date
}>({
  slotsBooked: [],
  now: new Date(),
  startDate: new Date(props.date)
})

const emits = defineEmits<{
  (event: 'bookASlot', slot: { startDate: Date; hour: string }): void
  (event: 'cancelNewDate'): void
}>()

function isBooked(date: Date) {
  const dateToCompare = date.toISOString().split('T')[0]
  if (!props.bookedDate.length) {
    state.slotsBooked = []
    return
  }
  props.bookedDate.forEach((el) => {
    if (el.startDate.split('T')[0] === dateToCompare) {
      el.hour.forEach((hour: any) => {
        state.slotsBooked.push(hour)
      })
    }
  })
}

function checkIfIsSlotBooked(hour: string) {
  if (!state.slotsBooked) return false
  return state.slotsBooked.find((el) => el == hour) ? true : false
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

watchEffect(() => {
  if (props.date != state.startDate) isBooked(props.date)
  state.startDate = props.date
})
</script>

<style scoped lang="scss">
.date-title {
  font-size: 1rem;
  font-weight: bold;
}
</style>
