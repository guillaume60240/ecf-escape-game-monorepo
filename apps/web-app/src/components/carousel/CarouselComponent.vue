<template>
  <div class="wrapper">
    <div class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <template v-for="(picture, index) in state.carouselPicture" :key="index">
          <div :class="`carousel-item ${state.carouselImg === index + 1 ? 'active' : ''}`">
            <img
              :class="`${state.carouselImg === index + 1 ? 'd-block' : ''} w-100`"
              :src="picture.src"
              :alt="picture.alt"
            />
          </div>
        </template>
      </div>
      <a class="carousel-control-prev" role="button" @click="changeCarouselImg()">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </a>
      <a class="carousel-control-next" role="button" @click="changeCarouselImg()">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive<{
  carouselImg: number
  laucherCarousel: any
  carouselPicture: {
    src: string
    alt: string
  }[]
}>({
  carouselImg: 1,
  laucherCarousel: 0,
  carouselPicture: [
    {
      src: 'https://storage.googleapis.com/escape-game-img/carousel-1.jpg',
      alt: 'Door in donjon'
    },
    {
      src: 'https://storage.googleapis.com/escape-game-img/carousel-2.jpg',
      alt: 'Table on balck room'
    }
  ]
})
// carousel function
function changeCarouselImg() {
  clearTimeout(state.laucherCarousel)
  state.carouselImg = state.carouselImg === 1 ? 2 : 1
  initCarousel()
}

function initCarousel() {
  state.laucherCarousel = setTimeout(() => {
    changeCarouselImg()
  }, 4000)
}
initCarousel()
</script>

<style scoped lang="scss">
.carousel {
  max-width: 750px;
  height: calc(100vw * 0.484);
  max-height: calc(750px * 0.484);
  .carousel-inner {
    height: 100%;
    .carousel-item-active {
      max-height: 100%;
      .img {
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
