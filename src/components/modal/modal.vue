<script setup lang="ts">
import { PhX } from "@phosphor-icons/vue";
import { onUnmounted, watch } from "vue";

const props = defineProps({
  openModal: Boolean,
  handleModal: {
    required: true,
    type: Function,
  },
});

const handleEscKey = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    props.handleModal();
  }
};

watch(
  () => props.openModal,
  (value) => {
    if (value) {
      window.addEventListener("keydown", handleEscKey);
    } else {
      window.removeEventListener("keydown", handleEscKey);
    }
  }
);

onUnmounted(() => {
  window.addEventListener("keydown", handleEscKey);
});
</script>

<template>
  <dialog :open="openModal">
    <div class="header">
      <div>
        <slot name="header" />
      </div>
      <button :onclick="handleModal">
        <PhX class="icon" size="20" />
      </button>
    </div>
    <slot />
  </dialog>

  <div :onclick="handleModal" :class="{ modal: true, open: openModal }"></div>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  display: none;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  background: rgba(0, 0, 0, 0.3);

  &.open {
    display: flex;
  }
}

dialog {
  position: fixed;
  background-color: white;
  padding: 2rem;
  border: none;
  border-radius: 1rem;
  width: 500px;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 100%;
  margin-bottom: 1rem;

  button {
    background: none;
    border: none;
  }

  .icon {
    cursor: pointer;
    display: inline;
  }
}
</style>
