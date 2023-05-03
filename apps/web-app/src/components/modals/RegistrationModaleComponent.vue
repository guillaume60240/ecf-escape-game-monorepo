<template>
  <div class="modale-container">
    <button class="btn btn-link closeButton" @click="closeRegistrationModale()">
      <i class="bi bi-x-lg"></i>
    </button>
    <h3>Espace inscription</h3>
    <div class="alert alert-danger" v-if="state.registrationFailed">
      Une erreur est survenue lors de l'inscription. Merci de contacter Escape Game pour plus
      d'informations.
    </div>
    <hr />
    <div class="mb-3">
      <label for="userMailInput" class="form-label">Adresse mail</label>
      <input
        type="email"
        :class="[
          `form-control`,
          !state.emailIsValid && state.userMail ? 'is-invalid' : '',
          state.emailIsValid ? 'is-valid' : ''
        ]"
        id="userMailInput"
        placeholder="name@example.com"
        v-model="state.userMail"
        @input="validateEmail()"
      />
    </div>
    <div class="mb-3">
      <label for="userNameInput" class="form-label">Prénom</label>
      <input
        type="text"
        :class="[
          `form-control`,
          !state.userNameIsValid && state.userName ? 'is-invalid' : '',
          state.userNameIsValid ? 'is-valid' : ''
        ]"
        id="userNameInput"
        placeholder="John"
        v-model="state.userName"
        @input="validateUserName()"
      />
    </div>
    <div class="mb-3">
      <label for="firstPasswordInput" class="form-label">Mot de passe</label>
      <input
        type="password"
        :class="[
          `form-control`,
          !state.passwordAreTheSame && state.firstPassword && state.confirmPassword
            ? 'is-invalid'
            : '',
          state.passwordAreTheSame && state.confirmPassword && state.firstPassword ? 'is-valid' : ''
        ]"
        id="firstPasswordInput"
        placeholder="password"
        v-model="state.firstPassword"
      />
    </div>
    <div class="mb-3">
      <label for="confirmPasswordInput" class="form-label">Mot de passe confirmation</label>
      <input
        type="password"
        :class="[
          `form-control`,
          !state.passwordAreTheSame && state.firstPassword && state.confirmPassword
            ? 'is-invalid'
            : '',
          state.passwordAreTheSame && state.confirmPassword && state.firstPassword ? 'is-valid' : ''
        ]"
        id="confirmPasswordInput"
        placeholder="password"
        v-model="state.confirmPassword"
      />
    </div>
    <div class="form-check">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="validCondition"
        v-model="state.validCondition"
      />
      <label class="form-check-label" for="validCondition">
        J'accepte
        <RouterLink to="/confidential-policies" @click="closeRegistrationModale()"
          >la politique de confidentialité</RouterLink
        >
        et
        <RouterLink to="/general-conditions" @click="closeRegistrationModale()"
          >les conditions générales de vente</RouterLink
        >
      </label>
    </div>
    <div class="form-check mb-3">
      <input
        class="form-check-input"
        type="checkbox"
        value=""
        id="validCondition"
        v-model="state.imHuman"
      />
      <label class="form-check-label" for="validCondition"> Je ne suis pas un robot</label>
    </div>

    <div class="sample-captcha mb-3" v-if="state.imHuman">
      <label class="form-label" for="captachInput">Merci de copier le code ci-dessous</label>
      <input type="text" v-model="inputValue" id="captachInput" class="form-control" />
      <VueClientRecaptcha
        :value="inputValue"
        @getCode="getCaptchaCode"
        @isValid="checkValidCaptcha"
      />
    </div>
    <div class="d-flex justify-content-evenly align-items-center w-100">
      <button class="btn btn-primary" :disabled="!state.formIsOK" @click="registerNewUser">
        Valider
      </button>
    </div>
    <div class="mt-2">
      <button class="registerRedirectionButton">
        <small @click="openLoginModale()">Déjà inscrit? Connectez vous</small>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect } from 'vue'
import { register, login } from '@/services/api-request/user-manager/user-services'
import { useUserStore } from '@/stores/user'

const state = reactive<{
  userMail: string
  firstPassword: string
  confirmPassword: string
  userName: string
  validCondition: boolean
  passwordAreTheSame: boolean
  formIsOK: boolean
  emailIsValid: boolean
  imHuman: boolean
  captchaIsValid: boolean
  userNameIsValid: boolean
  registrationFailed: boolean
}>({
  userMail: '',
  firstPassword: '',
  confirmPassword: '',
  userName: '',
  validCondition: false,
  passwordAreTheSame: true,
  formIsOK: false,
  emailIsValid: false,
  imHuman: false,
  captchaIsValid: false,
  userNameIsValid: false,
  registrationFailed: false
})
const inputValue = ref(null)

const getCaptchaCode = (value: string) => {
  console.log('Tu ne verras pas')
}
const checkValidCaptcha = (value: boolean) => {
  state.captchaIsValid = value
}

function validateEmail() {
  const regexp = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
  if (regexp.test(state.userMail)) {
    state.emailIsValid = true
  } else {
    state.emailIsValid = false
  }
}

function validateUserName() {
  const regexp = new RegExp('[a-zA-ZéùëïîÉèÈç-]{3,30}$')
  if (regexp.test(state.userName)) {
    state.userNameIsValid = true
  } else {
    state.userNameIsValid = false
  }
}

async function registerNewUser() {
  const request = await register(state.userMail, state.firstPassword, state.userName)
  if (request) {
    const loginRequest = await login(state.userMail, state.firstPassword)
    if (loginRequest) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: loginRequest.userId,
          mail: loginRequest.userMail,
          name: loginRequest.userName,
          accesToken: loginRequest.access_token
        })
      )
      const userStore = useUserStore()
      userStore.setUser({
        id: loginRequest.userId,
        mail: loginRequest.userMail,
        name: loginRequest.userName,
        accesToken: loginRequest.access_token
      })
      emits('registerNewUser')
      closeRegistrationModale()
    } else {
      state.registrationFailed = true
    }
  } else {
    state.registrationFailed = true
  }
}
watchEffect(() => {
  if (state.confirmPassword !== state.firstPassword) {
    state.passwordAreTheSame = false
  }
  if (state.confirmPassword === state.firstPassword) {
    state.passwordAreTheSame = true
  }

  if (
    state.confirmPassword === state.firstPassword &&
    state.validCondition &&
    state.userMail &&
    state.firstPassword &&
    state.confirmPassword &&
    state.passwordAreTheSame &&
    state.captchaIsValid
  ) {
    state.formIsOK = true
  }
})

const emits = defineEmits<{
  (event: 'closeRegistrationModale'): void
  (event: 'openLoginModale'): void
  (event: 'registerNewUser'): void
}>()

function closeRegistrationModale() {
  emits('closeRegistrationModale')
}

function openLoginModale() {
  emits('openLoginModale')
}
</script>

<style scoped lang="scss">
.modale-container {
  background: #fff;
  padding: 2rem;
  border-radius: 5px;
  min-width: 90%;
  max-height: 100%;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: scroll;

  .closeButton {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    color: var(--text-nav);
  }
  .registerRedirectionButton {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    color: var(--info-500);
  }
}

.is-invalid {
  border-color: var(--danger-500);
}
.is-valid {
  border-color: var(--success-500);
}
</style>
