<script setup lang="ts"></script>

<template>
  <div class="main-container">
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
