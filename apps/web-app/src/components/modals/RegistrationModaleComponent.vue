<template>
  <div class="modale-container">
    <button class="btn btn-link closeButton" @click="closeRegistrationModale()">
      <i class="bi bi-x-lg"></i>
    </button>
    <h3>Espace inscription</h3>
    <hr />
    <div class="mb-3">
      <label for="userMailInput" class="form-label">Adresse mail</label>
      <input type="email" class="form-control" id="userMailInput" placeholder="name@example.com" />
    </div>
    <div class="mb-3">
      <label for="firstPasswordInput" class="form-label">Mot de passe</label>
      <input type="password" class="form-control" id="firstPasswordInput" placeholder="password" />
    </div>
    <div class="mb-3">
      <label for="confirmPasswordInput" class="form-label">Mot de passe confirmation</label>
      <input
        type="password"
        class="form-control"
        id="confirmPasswordInput"
        placeholder="password"
      />
    </div>
    <div class="d-flex justify-content-evenly align-items-center w-100">
      <button class="btn btn-primary">Valider</button>
    </div>
    <div class="mt-2">
      <button class="registerRedirectionButton">
        <small @click="openLoginModale()">Déjà inscrit? Connectez vous</small>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits<{
  (event: 'closeRegistrationModale'): void
  (event: 'openLoginModale'): void
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
