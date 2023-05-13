<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Connexion</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Connexion</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list class="list">
        <ion-item>
          <ion-input
            label="Nom du game master"
            placeholder="Game Master"
            labelPlacement="floating"
            v-model="state.gameMaster"
            @input="checkForm"
            @change="checkForm"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            label="Mot de passe"
            placeholder="password"
            labelPlacement="floating"
            type="password"
            v-model="state.password"
            @input="checkForm"
            @change="checkForm"
          ></ion-input>
        </ion-item>
        <ion-button
          :disabled="!state.formIsOk"
          expand="block"
          color="primary"
          @click="login"
        >
          Se connecter
        </ion-button>
      </ion-list>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <small
          >L'utilisation de cette application est réservée à l'usage
          interne</small
        >
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonButton,
  IonList,
  IonFooter,
} from "@ionic/vue";
import { reactive } from "vue";
import { gameMasterLogin } from "@/services/api-request/game-master-manager/game-master-manager-request";
import { useRouter } from "vue-router";

const router = useRouter();
const state = reactive({
  gameMaster: "",
  password: "",
  formIsOk: false,
});

function checkForm() {
  state.formIsOk = state.gameMaster.length > 0 && state.password.length > 0;
}

async function login() {
  const gameMaster = await gameMasterLogin(state.gameMaster, state.password);
  if (gameMaster) {
    console.log("login success");
    router.push("/");
  } else {
    console.log("login failed");
  }

  state.gameMaster = "";
  state.password = "";
  state.formIsOk = false;
}
</script>

<style scoped lang="css">
.list {
  margin-top: 50%;
}
.button {
  margin-top: 5rem;
  margin-right: 2rem;
  margin-left: 2rem;
}
.in-toolbar {
  text-align: center;
}
</style>
