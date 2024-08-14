<script setup lang="ts">
import Modal from "./modal.vue";

const props = defineProps({
  openModal: {
    type: Boolean,
    required: true,
  },
  handleModal: {
    type: Function,
    required: true,
  },
  agendaId: {
    type: String,
    required: true,
  },
  removeSchedule: {
    type: Function,
    required: true,
  },
});

async function handleDelete() {
  try {
    await fetch(`http://localhost:3000/schedule/${props.agendaId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cancelled: true,
      }),
    });

    props.removeSchedule(props.agendaId);
    props.handleModal();
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}
</script>

<template>
  <Modal :open-modal="openModal" :handle-modal="handleModal">
    <template v-slot:header>
      <h1>Deseja Cancelar Este Evento?</h1>
      <p class="modal-description">
        Tem certeza de que deseja cancelar este evento? Esta ação é irreversível
        e todos os participantes serão notificados.
      </p>
    </template>
    <div class="modal-buttons">
      <button :onclick="handleModal" class="btn btn-cancel">Voltar</button>
      <button :onclick="handleDelete" class="btn btn-confirm">
        Confirmar Cancelamento
      </button>
    </div>
  </Modal>
</template>

<style scoped>
.modal-description {
  font-size: 1.3rem;
}

.modal-buttons {
  display: flex;
  margin-top: 2rem;
  justify-content: end;
  gap: 1rem;

  .btn {
    background: none;
    border: 0.1rem solid #e6e6e6;
    cursor: pointer;
    padding: 1rem;
    border-radius: 1rem;

    &:hover {
      background-color: #e6e6e6;
    }
  }

  .btn-confirm {
    background-color: rgb(252, 84, 84);
    color: white;

    &:hover {
      background-color: rgb(248, 67, 67);
    }
  }
}
</style>
