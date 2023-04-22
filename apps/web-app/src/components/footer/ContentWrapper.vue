<template>
  <div class="wrapper">
    <slot name="title"></slot>
    <slot name="content"></slot>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  padding: 2rem;
  border: solid 1px var(--white);
  border-radius: 5px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  max-width: 1280px;
}
</style>
