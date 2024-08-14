<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import SheduleModal from "./modal/sheduleModal.vue";
import { Agenda } from "../utils/types";

defineProps<{
  updateSchedule?: () => void;
}>();

const route = useRoute();
const path = computed(() => route.path);
const openSheduleModal = ref(false);

const isHomePath = computed(() => path.value === "/");
const isCancelPath = computed(() => path.value === "/cancelled");
const isPastPath = computed(() => path.value === "/past");

const handleScheduleModal = () => {
  openSheduleModal.value = !openSheduleModal.value;
};
</script>

<template>
  <nav>
    <ul>
      <li :class="{ actually: isHomePath }">
        <RouterLink :class="{ active: isHomePath }" to="/"
          >Agendados</RouterLink
        >
      </li>
      <li :class="{ actually: isPastPath }">
        <RouterLink :class="{ active: isPastPath }" to="/past"
          >Passados</RouterLink
        >
      </li>
      <li :class="{ actually: isCancelPath }">
        <RouterLink :class="{ active: isCancelPath }" to="/cancelled"
          >Cancelados</RouterLink
        >
      </li>
    </ul>

    <button :onclick="handleScheduleModal">Agendar</button>
  </nav>

  <SheduleModal
    :updateSchedule="updateSchedule"
    :openModal="openSheduleModal"
    :handleModal="handleScheduleModal"
  />
</template>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: space-between;
}

button {
  border: none;
  padding: 1rem 2rem;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 500;

  &:hover {
    background-color: #172838;
    color: white;
  }
}

ul {
  display: flex;
  width: fit-content;
  gap: 2rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: #f8f8f8;
}

li {
  list-style-type: none;
  padding: 0.8rem;
  border-radius: 0.5rem;

  &.actually {
    background: white;
    box-shadow: 0.1rem 0.4rem 1rem rgba(0, 0, 0, 0.055);
  }
}

a {
  font-size: 1.6rem;
  text-decoration: none;
  color: #888b90;
  font-weight: 500;

  &.active {
    color: #4c4d4e;
  }
}
</style>
