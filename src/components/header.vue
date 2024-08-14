<script setup lang="ts">
import Menu from "./menu.vue";

defineProps<{
  updateSchedule?: () => void;
}>();
</script>

<template>
  <header>
    <div class="container-header">
      <h1>Agenda</h1>
      <p>Veja todas os seus eventos agendados.</p>
    </div>

    <Menu :updateSchedule="updateSchedule" />
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  font-size: 1.6rem;
  padding: 3rem 1rem;
  max-width: 900px;
  width: 100%;
}

.container-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h1 {
  font-weight: 800;
}

p {
  font-size: 1.4rem;
  color: rgba(0, 0, 0, 0.575);
}
</style>
