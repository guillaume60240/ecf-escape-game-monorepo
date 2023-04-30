<template>
  <div class="ms-2 me-2">
    <span class="date-title"> ... </span>
    <div class="d-flex flex-column mt-2">
      <template v-for="(slot, index) in props.timeSlots" :key="index">
        <SlotComponent
          :label="slot.hour"
          :isLost="true"
          :isBooked="true"
          :startDate="new Date()"
          :newDateBooked="null"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import SlotComponent from './SlotComponent.vue'

const props = defineProps<{
  timeSlots: { id: string; hour: string }[]
}>()
</script>
