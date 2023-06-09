<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import ModaleOverlayComponent from './components/modals/ModaleOverlayComponent.vue'
import LoginModaleComponent from './components/modals/LoginModaleComponent.vue'
import RegistrationModaleComponent from './components/modals/RegistrationModaleComponent.vue'
import FooterComponent from './components/footer/FooterComponent.vue'
import { reactive, watchEffect } from 'vue'
import { useUserStore } from '@/stores/user'
import type { userDto } from './dto/user.dto'

const userStore = useUserStore()
function openLoginModal() {
  state.loginModaleIsOpen = true
}

function closeLoginModal() {
  state.loginModaleIsOpen = false
  state.user = userStore.getUser()
}

function closeRegistrationModale() {
  state.registartionModalIsOpen = false
  state.user = userStore.getUser()
}

function logoutUser() {
  userStore.resetUser()
  state.user = userStore.user
}

function registerUserSuccess() {
  state.needAlertMessage = true
  state.registartionModalIsOpen = false
  state.alertType = 'success'
  state.statusMessage = 'Votre compte a bien été créé'
  state.user = userStore.getUser()
  setTimeout(() => {
    state.needAlertMessage = false
    state.alertType = 0
    state.statusMessage = ''
  }, 5000)
}

function bookingDone(statut: 'success' | 'danger', message: string) {
  state.alertType = statut
  state.statusMessage = message
  state.needAlertMessage = true
  setTimeout(() => {
    state.alertType = 0
    state.statusMessage = ''
    state.needAlertMessage = false
  }, 5000)
}

const state = reactive<{
  loginModaleIsOpen: boolean
  registartionModalIsOpen: boolean
  needAlertMessage: boolean
  user: userDto
  alertType: 'success' | 'danger' | 0
  statusMessage: string
}>({
  loginModaleIsOpen: false,
  registartionModalIsOpen: false,
  needAlertMessage: false,
  user: userStore.user,
  alertType: 0,
  statusMessage: ''
})

watchEffect(() => {
  state.user = userStore.getUser()
})
</script>

<template>
  <header>
    <div :class="`alert alert-${state.alertType}`" v-if="state.needAlertMessage">
      {{ state.statusMessage }}
    </div>
    <div class="d-flex align-items-top justify-content-between">
      <div class="d-flex flex-column align-items-start">
        <router-link to="/">
          <img alt="Escape Game logo" class="logo" src="@/assets/icon.jpg" />
        </router-link>
        <p class="icon-text">The Escape Game</p>
      </div>

      <div class="title-wrapper">
        <span>The way you choose</span> <span>Can be the way to go</span><span>Or not</span>
      </div>
    </div>

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Accueil</RouterLink>
        <span
          class="modal-action"
          @click=";(state.loginModaleIsOpen = true), (state.registartionModalIsOpen = false)"
          v-if="!state.user.accesToken"
          >Connexion</span
        >
        <span v-else class="modal-action" @click="logoutUser">Déconnexion</span>
        <span
          class="modal-action"
          @click=";(state.loginModaleIsOpen = false), (state.registartionModalIsOpen = true)"
          v-if="!state.user.accesToken"
          >Créer un compte</span
        >

        <RouterLink :to="{ name: 'user-profile', params: { id: state.user.id } }" v-else
          >Mon compte</RouterLink
        >
      </nav>
    </div>
  </header>

  <RouterView class="content" @openLoginModal="openLoginModal" @bookingDone="bookingDone" />
  <ModaleOverlayComponent v-if="state.loginModaleIsOpen">
    <LoginModaleComponent
      @closeLoginModal="closeLoginModal"
      @openRegistrationModale="
        ;(state.loginModaleIsOpen = false), (state.registartionModalIsOpen = true)
      "
    />
  </ModaleOverlayComponent>
  <ModaleOverlayComponent v-if="state.registartionModalIsOpen">
    <RegistrationModaleComponent
      @closeRegistrationModale="closeRegistrationModale"
      @openLoginModale=";(state.loginModaleIsOpen = true), (state.registartionModalIsOpen = false)"
      @registerNewUser="registerUserSuccess"
    />
  </ModaleOverlayComponent>

  <FooterComponent />
</template>

<style scoped lang="scss">
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  .icon-text {
    font-size: 14px;
    font-weight: bold;
    margin-top: 1rem;
  }
  .alert {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .title-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    font-size: 16px;
    font-weight: 400;
    flex-grow: 1;
    line-height: 18.75px;

    :nth-child(2) {
      margin-left: 2rem;
    }
    :nth-child(3) {
      margin-left: 4rem;
    }
  }

  a {
    color: var(--text-nav);
    text-decoration: none;
    transition: color 0.2s ease-in-out;
    font-size: 14px;
    font-weight: regular;
  }

  .logo {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  nav {
    width: 100%;
    font-size: 12px;
    margin-top: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .modal-action {
      cursor: pointer;
      font-size: 14px;
      font-weight: regular;
      color: var(--text-nav);
    }
  }

  nav a.router-link-exact-active {
    color: var(--text-nav-active);
  }
}

.content {
  max-width: 1280px;
  margin: 0 auto;
}

@media (min-width: 750px) {
  header {
    flex-direction: row;
    padding: 1rem 2rem;

    .wrapper {
      flex-grow: 1;
      display: flex;
      align-items: center;

      nav {
        margin: 0;
      }
    }
    .title-wrapper {
      font-size: 24px;
      line-height: 28.125px;
      :nth-child(2) {
        margin-left: 4rem;
      }
      :nth-child(3) {
        margin-left: 8rem;
      }
    }

    .logo {
      width: 80px;
      height: 80px;
    }

    .icon-text {
      font-size: 16px;
      margin-top: 2rem;
    }
  }
}
</style>
