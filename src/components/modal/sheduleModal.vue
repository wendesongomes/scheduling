<script setup lang="ts">
import { ref } from "vue";
import Modal from "./modal.vue";
import { PhInfo } from "@phosphor-icons/vue";
import { parseISO } from "date-fns";

const props = defineProps<{
  openModal: boolean;
  handleModal: () => void;
  updateSchedule?: () => void;
}>();

const invites = ref<String[]>([]);
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

const removeInvite = (index: number) => {
  const actualIndex = showInvites.value
    ? index
    : invites.value.indexOf(invites.value[index]);

  invites.value.splice(actualIndex, 1);
};

async function handleSubmit(event: Event) {
  event.preventDefault();

  const formData = new FormData(event.target as HTMLFormElement);
  const title = formData.get("title");
  const startDateHour = formData.get("start-date-hour");
  const end = formData.get("end-hour");
  const location = formData.get("location");

  if (startDateHour) {
    const start = parseISO(startDateHour.toString());

    await fetch("http://localhost:3000/schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        date: {
          start,
          end,
        },
        location,
        invites: invites.value,
        cancelled: false,
      }),
    });

    if (props.updateSchedule) {
      props.updateSchedule();
    }

    props.handleModal();
  }
}
</script>

<template>
  <Modal :openModal="openModal" :handleModal="handleModal">
    <template v-slot:header>
      <h1>Novo agendamento</h1>
    </template>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Titulo</label>
        <input id="title" name="title" type="text" placeholder="Title" />
      </div>

      <div class="form-group">
        <label>Data e hora</label>
        <div class="input-group">
          <input
            type="datetime-local"
            name="start-date-hour"
            id="start-date-hour"
          />
          <input type="time" name="end-hour" id="end-hour" />
        </div>
      </div>

      <div class="form-group">
        <label for="location">Endereço</label>
        <input
          id="location"
          name="location"
          type="text"
          placeholder="Localização"
        />
      </div>

      <div class="form-group">
        <div class="container-title">
          <label for="invite">Convide outras pessoas</label>
          <span
            title="Clique no e-mail para removê-lo. Clique no +quantidade para ver todos os e-mails."
            ><PhInfo class="icon" :size="16" weight="fill"
          /></span>
        </div>
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

      <div class="footer">
        <button type="submit">Agendar</button>
      </div>
    </form>
  </Modal>
</template>

<style lang="scss" scoped>
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

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .form-group {
    label {
      font-size: 1.6rem;
      font-weight: 800;
    }

    .container-title {
      display: flex;
      align-items: center;
      gap: 0.2rem;

      .icon {
        margin-top: 0.6rem;
      }
    }

    .input-group {
      display: flex;
      gap: 1rem;
    }
  }

  input {
    width: 100%;
    font-size: 1.6rem;
    padding: 1rem;
    border: 0.1rem solid rgb(211, 211, 211);
    border-radius: 1rem;
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
}

.footer {
  width: 100%;
  display: flex;
  justify-content: center;

  button {
    color: white;
    background-color: #172838;

    &:hover {
      background-color: #0c151d;
    }
  }
}
</style>
