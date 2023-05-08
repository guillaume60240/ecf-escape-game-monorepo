<template>
  <footer>
    <div class="row justify-content-around footer-content-container">
      <ContentWrapper class="col-12 col-md-4 col-xl-3">
        <template v-slot:title>
          <h4>Horaires</h4>
        </template>
        <template v-slot:content>
          <p>Du lundi au vendredi de 9h à 18h</p>
          <p>le samedi de 9h à 12h</p>
        </template>
      </ContentWrapper>
      <ContentWrapper class="col-12 col-md-4 col-xl-3">
        <template v-slot:title>
          <h4>Pratique</h4>
        </template>
        <template v-slot:content>
          <RouterLink to="/faq">La FAQ</RouterLink>
          <RouterLink to="/confidential-policies#politiciestitle"
            >Polique de confidentialité</RouterLink
          >
          <RouterLink to="/general-conditions#conditionstitle"
            >Les conditions générales de vente</RouterLink
          >
        </template>
      </ContentWrapper>
      <ContentWrapper class="col-12">
        <template v-slot:title>
          <h4>Nous contacter</h4>
        </template>
        <template v-slot:content>
          <div class="contact-wrapper">
            <div class="social-links">
              <a href=""><i class="bi bi-facebook"></i></a>
              <a href=""><i class="bi bi-instagram"></i></a>
              <a href=""><i class="bi bi-twitter"></i></a>
              <a href=""><i class="bi bi-linkedin"></i></a>
            </div>
            <div>
              <p>Téléphone : 01 23 45 67 89</p>
              <p>Email : mail@mail.fr</p>
              <p>Adresse : 1 rue de la paix, 75000 Paris</p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.4566444531356!2d2.3280719156747325!3d48.868570779288454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e31bb649637%3A0xc231c2c26c37df78!2s1%20Rue%20de%20la%20Paix%2C%2075002%20Paris!5e0!3m2!1sen!2sfr!4v1682182708701!5m2!1sen!2sfr"
              style="border: 0"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </template>
      </ContentWrapper>
    </div>
  </footer>
</template>

<script setup lang="ts">
import ContentWrapper from './ContentWrapper.vue'
</script>

<style scoped lang="scss">
footer {
  background-color: var(--secondary-500);
  color: var(--white);
  padding: 2rem;
  margin-top: 2rem;
  width: 100%;
  display: flex;
  align-items: center;

  .footer-content-container {
    max-width: 1280px;
    margin: 0 auto;
  }

  h4 {
    text-align: center;
  }
  p {
    text-align: center;
    font-size: 12px;
    font-weight: 400;
  }
  a {
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    color: var(--white);
    text-decoration: none;
  }

  .contact-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .social-links {
      display: flex;
      justify-content: space-around;
      margin-top: 1rem;
      margin-bottom: 1rem;
      font-size: 12px;
      font-weight: 400;
      color: var(--white);
      text-decoration: none;
      width: 100%;
      i {
        font-size: 40px;
      }
    }

    iframe {
      width: 100%;
      height: 300px;
    }
  }

  @media screen and (min-width: 768px) {
    .contact-wrapper {
      flex-direction: row;
      justify-content: space-between;
      .social-links {
        margin-top: 0;
        margin-bottom: 0;
        flex-direction: column;
        width: min-content;
        i {
          font-size: 40px;
        }
      }

      iframe {
        width: 50%;
        height: 300px;
      }
    }
  }
}
</style>
