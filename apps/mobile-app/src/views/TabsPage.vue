<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/list">
          <ion-icon aria-hidden="true" :icon="listCircleOutline" />
          <ion-label>Réservations</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/game-started">
          <ion-icon aria-hidden="true" :icon="ellipse" />
          <ion-label>En cours</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" @click="reload">
          <ion-icon :icon="reloadCircleOutline"></ion-icon>
          <ion-label>Actualiser</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" @click="logout">
          <ion-icon aria-hidden="true" :icon="logOutOutline" />
          <ion-label>Déconnexion</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import {
  ellipse,
  listCircleOutline,
  reloadCircleOutline,
  logOutOutline,
} from "ionicons/icons";
import { useRouter } from "vue-router";
const router = useRouter();
function logout() {
  localStorage.removeItem("user");
  router.push("/login");
}

function reload() {
  router.go(0);
}
</script>
