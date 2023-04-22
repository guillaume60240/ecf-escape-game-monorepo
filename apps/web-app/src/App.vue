<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import FooterComponent from './components/footer/FooterComponent.vue'
</script>

<template>
  <header>
    <div class="d-flex align-items-top justify-content-between">
      <div class="d-flex flex-column align-items-start">
        <img alt="Escape Game logo" class="logo" src="@/assets/icon.jpg" />
        <p class="icon-text">The Escape Game</p>
      </div>

      <div class="title-wrapper">
        <span>The way you choose</span> <span>Can be the way to go</span><span>Or not</span>
      </div>
    </div>

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/about">Connexion</RouterLink>
        <RouterLink to="/about">Créer un compte</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView class="content" />

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
