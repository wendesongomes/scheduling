<script setup lang="ts">
import {
  PhCaretDown,
  PhCaretUp,
  PhClock,
  PhMapPin,
  PhUserPlus,
  PhXCircle,
} from "@phosphor-icons/vue";
import { onMounted, onUnmounted, ref } from "vue";

defineProps({
  isDropdownOpen: Boolean,
});

const dropdownRef = ref<HTMLElement | undefined>(undefined);

const emit = defineEmits<{
  (event: "toggleDropdown"): void;
  (event: "closeDropdown"): void;
}>();

function toggleDropdown() {
  emit("toggleDropdown");
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node;
  if (dropdownRef.value && !dropdownRef.value.contains(target)) {
    emit("closeDropdown");
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div
    ref="dropdownRef"
    :class="{ dropdown: true, open: isDropdownOpen }"
    @click="toggleDropdown"
  >
    <div class="dropdown-title">
      <p>Edit</p>
      <PhCaretUp
        @click.stop="toggleDropdown"
        v-if="isDropdownOpen"
        :size="18"
        weight="bold"
      />
      <PhCaretDown
        @click.stop="toggleDropdown"
        v-else
        :size="18"
        weight="bold"
      />
    </div>

    <div v-if="isDropdownOpen" class="dropdown-items">
      <div class="dropdown-item">
        <PhClock :size="16" weight="fill" />
        <p class="item">Remarcar</p>
      </div>
      <div class="dropdown-item">
        <PhMapPin :size="16" weight="fill" />
        <p class="item">Editar Local</p>
      </div>
      <div class="dropdown-item">
        <PhUserPlus :size="16" weight="fill" />
        <p class="item">Invitar Pessoa</p>
      </div>
      <span class="divide" />
      <div class="dropdown-item">
        <PhXCircle :size="16" weight="fill" />
        <p class="item">Cancelar Evento</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown {
  background-color: rgb(243, 243, 243);
  padding: 1.5rem 2rem;
  border-radius: 1rem;
  cursor: pointer;
  user-select: none;
  position: relative;

  &:hover {
    background-color: #172838;
    color: white;
  }

  &.open {
    background-color: #172838;
    color: white;
  }

  .dropdown-title {
    display: flex;
    gap: 0.5rem;
    font-size: 1.3rem;
    font-weight: 500;
  }

  .dropdown-items {
    position: absolute;
    background-color: white;
    border: 1px solid rgb(214, 214, 214);
    border-radius: 1rem;
    display: inline-flex;
    flex-direction: column;
    width: fit-content;
    gap: 0.5rem;
    right: 0;
    margin-top: 2rem;
    z-index: 10;
    min-width: 200px;

    .divide {
      width: 100%;
      height: 2px;
      background-color: rgb(240, 240, 240);
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      margin: 0.5rem 1rem;
      gap: 0.5rem;
      border-radius: 0.5rem;
      padding: 0.5rem 1rem;
      color: rgb(160, 160, 160);
      font-size: 1.6rem;

      &:hover {
        color: black;
        background-color: rgba(228, 228, 228, 0.432);
      }
    }
  }
}
</style>
