<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Réservations du jour</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Réservations du jour</ion-title>
        </ion-toolbar>
      </ion-header>
      <div v-if="!state.isLoaded" class="spinnerContainer">
        <ion-spinner color="tertiary" name="lines-sharp"></ion-spinner>
      </div>
      <ion-item-group v-else>
        <template v-for="slot in state.timeSlot" :key="slot.id">
          <ion-item-divider>
            <ion-label class="slotLabel">{{ slot.hour }}</ion-label>
          </ion-item-divider>
          <BookedDateContainerView
            :timeSlot="slot"
            :bookings="state.bookings"
            :isMobile="state.plateform.includes('mobile')"
          />
        </template>
      </ion-item-group>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonItemGroup,
  IonItemDivider,
  IonLabel,
  onIonViewDidEnter,
  onIonViewWillLeave,
} from "@ionic/vue";
import {
  getBookingWithUser,
  getTimeSlot,
} from "@/services/api-request/booking-manager/booking-manager-request";
import BookedDateContainerView from "@/components/BookedDateContainerView.vue";
import { getPlatforms } from "@ionic/vue";
import { computed, reactive } from "vue";

const plateform = computed(() => {
  return getPlatforms();
});
const state = reactive<{
  plateform: (
    | "mobile"
    | "ios"
    | "ipad"
    | "iphone"
    | "android"
    | "phablet"
    | "tablet"
    | "cordova"
    | "capacitor"
    | "electron"
    | "pwa"
    | "mobileweb"
    | "desktop"
    | "hybrid"
  )[];
  isMobile: boolean;
  bookings: any[];
  isLoaded: boolean;
  user: {
    access_token: string;
    userMail: string;
    userId: number;
    userName: string;
  } | null;
  today: string;
  timeSlot: {
    id: number;
    hour: string;
  }[];
}>({
  plateform: plateform.value,
  isMobile: false,
  bookings: [],
  isLoaded: false,
  user: null,
  today: new Date().toISOString().split("T")[0],
  timeSlot: [],
});

async function loadBookings(token: string) {
  const bookings = await getBookingWithUser(token, "2023-04-29");
  state.bookings = bookings;
  state.isLoaded = true;
  console.log("bookings", bookings);
}

async function loadTimeSlot() {
  const timeSlot = await getTimeSlot();
  state.timeSlot = timeSlot;
  console.log("timeSlot", timeSlot);
}

onIonViewDidEnter(() => {
  console.log("enter");
  const userString = localStorage.getItem("user");
  if (userString) {
    const user = JSON.parse(userString);
    console.log("user", user);
    state.user = user;
    loadTimeSlot();
    loadBookings(user.access_token);
  }
});
onIonViewWillLeave(() => {
  console.log("leave");
  state.isLoaded = false;
});
</script>

<style scoped lang="css">
.spinnerContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.slotLabel {
  background-color: var(--ion-color-tertiary-tint);
  --color: var(--ion-color-light);
  padding: 0.5rem 1rem;
}
</style>
