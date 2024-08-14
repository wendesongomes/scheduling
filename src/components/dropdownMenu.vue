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
import CancelModal from "./modal/cancelModal.vue";
import LocationModal from "./modal/locationModal.vue";
import InviteModal from "./modal/inviteModal.vue";
import RescheduleModal from "./modal/rescheduleModal.vue";
import { Agenda } from "../utils/types";

defineProps<{
  isDropdownOpen: Boolean;
  agenda: Agenda;
  removeSchedule: (agendaId: string) => void;
  updateSchedule?: () => void;
}>();

const dropdownRef = ref<HTMLElement | undefined>(undefined);
const openCancelModal = ref(false);
const openRescheduleModal = ref(false);
const openLocationModal = ref(false);
const openInviteModal = ref(false);

const handleCancelModal = () => {
  openCancelModal.value = !openCancelModal.value;
};

const handleRescheduleModal = () => {
  openRescheduleModal.value = !openRescheduleModal.value;
};

const handleLocationModal = () => {
  openLocationModal.value = !openLocationModal.value;
};

const handleInviteModal = () => {
  openInviteModal.value = !openInviteModal.value;
};

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
  <button
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
      <button @click="handleRescheduleModal" class="dropdown-item">
        <PhClock :size="16" weight="fill" />
        <p>Remarcar</p>
      </button>
      <button @click="handleLocationModal" class="dropdown-item">
        <PhMapPin :size="16" weight="fill" />
        <p>Editar Local</p>
      </button>
      <button @click="handleInviteModal" class="dropdown-item">
        <PhUserPlus :size="16" weight="fill" />
        <p>Convidar/Remover</p>
      </button>
      <span class="divide" />
      <button @click="handleCancelModal" class="dropdown-item">
        <PhXCircle :size="16" weight="fill" />
        <p>Cancelar Evento</p>
      </button>
    </div>
  </button>

  <CancelModal
    :removeSchedule="removeSchedule"
    :agendaId="agenda.id"
    :openModal="openCancelModal"
    :handleModal="handleCancelModal"
  />
  <RescheduleModal
    :agendaId="agenda.id"
    :updateSchedule="updateSchedule"
    :openModal="openRescheduleModal"
    :handleModal="handleRescheduleModal"
  />
  <LocationModal
    :agendaId="agenda.id"
    :updateSchedule="updateSchedule"
    :openModal="openLocationModal"
    :handleModal="handleLocationModal"
  />
  <InviteModal
    :agendaId="agenda.id"
    :updateSchedule="updateSchedule"
    :agendaInvites="agenda.invites"
    :openModal="openInviteModal"
    :handleModal="handleInviteModal"
  />
</template>

<style lang="scss" scoped>
.dropdown {
  background-color: rgb(243, 243, 243);
  padding: 1.5rem 2rem;
  border-radius: 1rem;
  user-select: none;
  position: relative;
  border: none;
  cursor: pointer;

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
      font-size: 1.4rem;
      border: none;
      background: none;
      cursor: pointer;

      &:hover {
        color: black;
        background-color: rgba(228, 228, 228, 0.432);
      }
    }
  }
}
</style>
