<script setup lang="ts">
import { PhInfo, PhX } from "@phosphor-icons/vue";
import { ref, watch } from "vue";

const props = defineProps({
  openModal: Boolean,
  handleModal: Function,
});

const invites = ref<String[]>([]);
const email = ref("");

watch(
  () => props.openModal,
  (value) => {
    if (value) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }
);

const handleInvites = () => {
  if (email.value.trim()) {
    invites.value.push(email.value.trim());
    email.value = "";
  }
};

function handleSubmit(event: Event) {
  event.preventDefault();

  const formData = new FormData(event.target as HTMLFormElement);
  const title = formData.get("title");
  const startDateHour = formData.get("start-date-hour");
  const endHour = formData.get("end-hour");
  const address = formData.get("address");

  console.log({
    title,
    startDateHour,
    endHour,
    address,
  });
}
</script>

<template>
  <div :class="{ modal: true, open: openModal }">
    <dialog :open="openModal">
      <div class="title">
        <h1>Novo agendamento</h1>
        <PhX class="icon" :onclick="handleModal" />
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title">Titulo</label>
          <input id="title" name="title" type="text" placeholder="Title" />
        </div>

        <div class="form-group">
          <label for="start-date-hour">Data e hora</label>
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
          <label for="address">Endereço</label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="Endereço"
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

        <div class="invites">
          <span v-for="(invite, index) in invites.slice(-5)" :key="index">{{
            invite
          }}</span>
          <div v-if="invites.length > 5" class="more-invites">
            <span>+{{ invites.length - 5 }}</span>
          </div>
        </div>

        <div class="end">
          <button type="submit">Agendar</button>
        </div>
      </form>
    </dialog>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: absolute;
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
  position: relative;
  background-color: white;
  padding: 2rem;
  border: none;
  border-radius: 1rem;
  width: 500px;

  button {
    border: none;
    padding: 1rem;
    border-radius: 1rem;
    background-color: rgb(15, 15, 15);
    cursor: pointer;
    color: white;
    font-weight: 800;

    &:hover {
      background-color: rgb(31, 31, 31);
    }
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;

    .icon {
      cursor: pointer;
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
      border: 0.2rem solid rgb(211, 211, 211);
      border-radius: 1rem;
    }

    .invites {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: start;
      gap: 1rem;

      span {
        background-color: rgb(241, 241, 241);
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        font-size: 1.4rem;
        font-weight: 500;
      }
    }
  }

  .end {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>
