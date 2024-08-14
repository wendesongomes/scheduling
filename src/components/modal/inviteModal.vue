<script setup lang="ts">
import { ref } from "vue";
import Modal from "./modal.vue";

const props = defineProps<{
  openModal: boolean;
  handleModal: () => void;
  agendaInvites: string[];
  agendaId: String;
  updateSchedule?: () => void;
}>();

const invites = ref<String[]>([...props.agendaInvites]);
const showInvites = ref(false);
const email = ref("");

const handleShowInvites = () => {
  showInvites.value = !showInvites.value;
};

const handleInvites = () => {
  if (email.value.trim()) {
    invites.value.unshift(email.value.trim());
    email.value = "";
  }
};

const handleFormInvites = async () => {
  try {
    await fetch(`http://localhost:3000/schedule/${props.agendaId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        invites: invites.value,
      }),
    });

    if (props.updateSchedule) {
      props.updateSchedule();
    }

    props.handleModal();
  } catch (error) {
    console.error("Error add/remove people:", error);
  }
};

const removeInvite = (index: number) => {
  const actualIndex = showInvites.value
    ? index
    : invites.value.indexOf(invites.value[index]);

  invites.value.splice(actualIndex, 1);
};
</script>

<template>
  <Modal :open-modal="openModal" :handle-modal="handleModal">
    <template v-slot:header>
      <h1>Convide alguem para esse evento.</h1>
      <p class="modal-description">Por favor, insira o email.</p>
    </template>

    <form @submit.prevent="handleFormInvites" action="">
      <div class="input-group">
        <input
          id="invite"
          name="invite"
          type="email"
          placeholder="Convide"
          v-model="email"
        />
        <button type="button" @click="handleInvites">Convidar</button>
      </div>

      <div
        :style="{ overflowY: showInvites ? 'auto' : 'hidden' }"
        class="container-invites"
      >
        <span
          v-for="(invite, index) in showInvites ? invites : invites.slice(0, 5)"
          @click="removeInvite(index)"
          :key="index"
          >{{ invite }}</span
        >
        <div
          :onclick="handleShowInvites"
          v-if="invites.length > 5"
          class="more-invites"
        >
          <span>{{
            showInvites ? "Ver menos" : `+${invites.length - 5}`
          }}</span>
        </div>
      </div>

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
  margin-bottom: 1rem;
}

.input-group {
  display: flex;
  gap: 1rem;

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
}

.container-invites {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  gap: 1rem;
  max-height: 30rem;
  margin-top: 1rem;

  span {
    background-color: rgb(241, 241, 241);
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    font-size: 1.4rem;
    font-weight: 500;
    cursor: pointer;
  }
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
