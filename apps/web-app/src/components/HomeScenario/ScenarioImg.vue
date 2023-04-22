<template>
  <img :src="props.imgUrl" :alt="props.alt" />
</template>

<script setup lang="ts">
const props = defineProps<{
  imgUrl: string
  alt: string
}>()
</script>

<style scoped lang="scss">
img {
  width: 100%;
  max-width: 165px;
  height: 100%;
  object-fit: cover;
}
</style>
