<script setup lang="ts">
import Header from "./components/header.vue";
</script>

<template>
  <div class="main-container">
    <Header />
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
}
</style>
