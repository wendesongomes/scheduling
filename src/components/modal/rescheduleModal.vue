<script setup lang="ts">
import Modal from "./modal.vue";

const props = defineProps<{
  openModal: boolean;
  handleModal: () => void;
  agendaId: string;
  updateSchedule?: () => void;
}>();

const handleSubmitReshedule = async (event: Event) => {
  const formdata = new FormData(event.target as HTMLFormElement);
  const start = formdata.get("start-date-hour");
  const end = formdata.get("end-hour");

  try {
    await fetch(`http://localhost:3000/schedule/${props.agendaId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: {
          start,
          end,
        },
      }),
    });

    if (props.updateSchedule) {
      props.updateSchedule();
    }

    props.handleModal();
  } catch (error) {
    console.error("error change location:", error);
  }
};
</script>

<template>
  <Modal :open-modal="openModal" :handle-modal="handleModal">
    <template v-slot:header>
      <h1>Remarcar evento</h1>
      <p class="modal-description">
        Por favor, selecione a nova data e horário para o evento. Todos os
        participantes serão notificados da alteração.
      </p>
    </template>

    <form @submit.prevent="handleSubmitReshedule">
      <div class="form-group">
        <input
          type="datetime-local"
          name="start-date-hour"
          id="start-date-hour"
          placeholder="Nova data e hora de início"
        />
        <input
          type="time"
          name="end-hour"
          id="end-hour"
          placeholder="Novo horário de término"
        />
      </div>

      <div class="modal-buttons">
        <button :onclick="handleModal" class="btn btn-cancel">Voltar</button>
        <button type="submit" class="btn btn-confirm">
          Confirmar Reagendamento
        </button>
      </div>
    </form>
  </Modal>
</template>

<style scoped>
.modal-description {
  font-size: 1.3rem;
}

.form-group {
  display: flex;
  gap: 1rem;

  input {
    width: 100%;
    font-size: 1.6rem;
    padding: 1rem;
    border: 0.1rem solid rgb(211, 211, 211);
    border-radius: 1rem;
  }
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
    background-color: #172838;
    color: white;

    &:hover {
      background-color: #0c151d;
    }
  }
}
</style>
