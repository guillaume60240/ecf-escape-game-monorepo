<template>
  <div class="bookedDate-container">
    <template v-if="state.bookings.length">
      <div
        v-for="(bookedDate, index) in state.bookings"
        :key="index"
        class="dateWrapper"
      >
        <p v-if="bookedDate">Client: {{ bookedDate.userName }}</p>
        <p>Scénario: {{ bookedDate.scenarioTitle }}</p>
        <p>Participants: {{ bookedDate.players }}</p>
        <template v-if="props.isMobile">
          <div v-if="bookedDate.status === 'pending'">
            <ion-button @click="startGame(bookedDate.bookingId)"
              >Démarrer</ion-button
            >
          </div>
        </template>
      </div>
      <div
        v-for="(bookedDate, index) in state.bookings"
        :key="index"
        class="dateWrapper"
      >
        <p v-if="bookedDate">Client: {{ bookedDate.userName }}</p>
        <p>Scénario: {{ bookedDate.scenarioTitle }}</p>
        <p>Participants: {{ bookedDate.players }}</p>
        <template v-if="props.isMobile">
          <div v-if="bookedDate.status === 'pending'">
            <ion-button @click="startGame(bookedDate.bookingId)"
              >Démarrer</ion-button
            >
          </div>
        </template>
      </div>
    </template>
    <template v-else>
      <p class="no-booking">Pas de réservation à ce créneau</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { IonButton } from "@ionic/vue";

const props = defineProps<{
  isMobile: boolean;
  timeSlot: {
    id: number;
    hour: string;
  };
  bookings: {
    hour: string;
    players: number;
    price: number;
    scenarioId: number;
    sceanrioTitle: string;
    startDate: string;
    userEmail: string;
    userId: number;
    userName: string;
    status: "pending" | "started" | "closed";
    bookingId: number;
  }[];
}>();

const state = reactive<{
  bookings: any[];
}>({
  bookings: props.bookings.filter(
    (booking) => booking.hour === props.timeSlot.hour
  ),
});

async function startGame(id: number) {
  console.log("start game");
  console.log(id);
}
console.log(props.isMobile);
</script>

<style scoped lang="css">
.bookedDate-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.dateWrapper {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  border: 1px solid var(--ion-color-primary);
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  max-width: max-content;
}
p {
  margin: 0.2rem;
}
.no-booking {
  color: var(--ion-color-danger);
  padding: 1rem;
}
/*media query*/
@media (max-width: 768px) {
  .bookedDate-container {
    flex-direction: column;
    padding: 1rem;
  }
  .dateWrapper {
    min-width: 100%;
  }
}
</style>
