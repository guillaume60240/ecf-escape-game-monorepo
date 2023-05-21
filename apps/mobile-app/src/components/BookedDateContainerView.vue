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
          <div class="btn-container">
            <ion-button
              size="small"
              @click="startGame(bookedDate.bookingId, bookedDate.scenarioId)"
              v-if="bookedDate.status === 'pending'"
              >Démarrer</ion-button
            >
            <ion-button
              size="small"
              color="danger"
              @click="stopGame(bookedDate.bookingId)"
              v-else-if="bookedDate.status === 'started'"
              >Arrêter</ion-button
            >
          </div>
        </template>
        <div class="chrono-container" v-if="bookedDate.status === 'started'">
          <AlertGame
            :game="
              state.games.filter(
                (item) => item.booking_id === bookedDate.bookingId
              )
            "
          />
        </div>
        <div class="btn-container">
          <IonNote color="danger" v-if="bookedDate.status === 'finished'"
            >Partie terminée</IonNote
          >
        </div>
      </div>
    </template>
    <template v-else>
      <p class="no-booking">Pas de réservation à ce créneau</p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { IonButton, IonNote } from "@ionic/vue";
import AlertGame from "./AlertGame.vue";
import { getGameByBookedDateId } from "@/services/api-request/game-manager/game-manager-request";
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
    status: "pending" | "started" | "finished";
    bookingId: number;
  }[];
  user: {
    access_token: string;
    userMail: string;
    userId: number;
    userName: string;
  } | null;
}>();

const state = reactive<{
  bookings: any[];
  chronoStart: number;
  user: {
    access_token: string;
    userMail: string;
    userId: number;
    userName: string;
  } | null;
  games: {
    booking_id: number;
    duration: number | null;
    ended_at: number | null;
    id: number;
    scenario_id: number;
    started_at: number | null;
  }[];
}>({
  bookings: props.bookings.filter(
    (booking) => booking.hour === props.timeSlot.hour
  ),
  chronoStart: 0,
  user: null,
  games: [],
});

function startGame(id: number, scenarioId: number) {
  emits("startGame", id, scenarioId);
}

function stopGame(bookingId: number) {
  emits("stopGame", bookingId);
}

const emits = defineEmits<{
  (event: "startGame", bookedId: number, scenarioId: number): void;
  (event: "stopGame", bookingId: number): void;
}>();

async function getGame(bookedDateId: number) {
  if (!props.user) return;
  const game = await getGameByBookedDateId(
    props.user?.access_token,
    bookedDateId
  );
  return game;
}

state.bookings.map(async (bookedDate) => {
  if (bookedDate.status === "started") {
    const game = await getGame(bookedDate.bookingId);
    state.games.push(game);
  }
});
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
.btn-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.chrono-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
