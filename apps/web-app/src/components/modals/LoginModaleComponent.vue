<template>
  <div class="modale-container">
    <button class="btn btn-link closeButton" @click="closeLoginModal()">
      <i class="bi bi-x-lg"></i>
    </button>
    <h3>Espace connexion</h3>
    <hr />
    <div class="mb-3">
      <label for="mailInput" class="form-label">Adresse mail</label>
      <input type="email" class="form-control" id="mailInput" placeholder="name@example.com" />
    </div>
    <div class="mb-3">
      <label for="passwordInput" class="form-label">Mot de passe</label>
      <input type="password" class="form-control" id="passwordInput" placeholder="password" />
    </div>
    <div class="d-flex justify-content-evenly align-items-center w-100">
      <button class="btn btn-primary">Valider</button>
    </div>
    <div class="mt-2">
      <button class="registerRedirectionButton">
        <small @click="openRegistrationModale()">Pas de compte? Créez en un</small>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (event: 'closeLoginModal'): void
  (event: 'openRegistrationModale'): void
}>()

function closeLoginModal() {
  emits('closeLoginModal')
}

function openRegistrationModale() {
  emits('openRegistrationModale')
}
</script>

<style scoped lang="scss">
.modale-container {
  background: #fff;
  padding: 2rem;
  border-radius: 5px;
  min-width: 90%;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  position: relative;

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
</style>
