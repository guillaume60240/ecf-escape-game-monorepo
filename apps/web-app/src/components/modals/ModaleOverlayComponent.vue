<template>
  <div class="modalBackground">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.modalBackground {
  background: #3c393944;
  position: fixed;
  z-index: 10;
  height: 100%;
  width: 100%;
  right: 0;
  top: 0;
  padding: 2rem;
  overflow: scroll;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
