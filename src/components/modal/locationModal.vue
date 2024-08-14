<script setup lang="ts">
import Modal from "./modal.vue";

const props = defineProps<{
  openModal: boolean;
  handleModal: () => void;
  agendaId: string;
  updateSchedule?: () => void;
}>();

const handleSubmitLocation = async (event: Event) => {
  const formdata = new FormData(event.target as HTMLFormElement);
  const location = formdata.get("location");

  try {
    await fetch(`http://localhost:3000/schedule/${props.agendaId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location,
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
      <h1>Deseja Cancelar Este Evento?</h1>
      <p class="modal-description">Por favor, insira sua nova localização</p>
    </template>

    <form @submit.prevent="handleSubmitLocation">
      <input
        id="location"
        name="location"
        type="text"
        placeholder="Localização"
      />

      <div class="content-bnt">
        <button :onclick="handleModal" class="btn">Voltar</button>
        <button class="btn btn-confirm">Confirmar Alteração</button>
      </div>
    </form>
  </Modal>
</template>

<style scoped>
.modal-description {
  font-size: 1.3rem;
}

input {
  width: 100%;
  font-size: 1.6rem;
  padding: 1rem;
  border: 0.1rem solid rgb(211, 211, 211);
  border-radius: 1rem;
}

.content-bnt {
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
