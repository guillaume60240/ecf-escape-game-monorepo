<template>
  <div class="d-flex flex-column align-items-center justify-content-around mt-2">
    <h1>La FAQ</h1>
    <div
      v-if="!state.isLoading"
      class="d-flex flex-column align-items-center justify-content-around container mt-2"
    >
      <div v-for="faq in state.faq" :key="faq.id" class="mt-4">
        <h2>{{ faq.question }}</h2>
        <p v-html="faq.answer"></p>
      </div>
    </div>
    <div v-else class="mt-5 d-flex justify-content-center align-items-center flex-column">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Chargement...</span>
      </div>
      <p class="mt-3">Chargement de la page...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { FaqDto } from '../dto/faq.dto'
import { getAllFaq } from '../services/api-request/faq-manager/faq-request'

const state = reactive<{
  faq: FaqDto[]
  isLoading: boolean
}>({
  faq: [],
  isLoading: true
})

async function getFaq() {
  state.faq = await getAllFaq()
  state.isLoading = false
}

getFaq()
</script>

<style scoped lang="scss"></style>
