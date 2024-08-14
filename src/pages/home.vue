<script setup lang="ts">
import { format, parse } from "date-fns";
import Schedule from "../components/schedule.vue";
import { ptBR } from "date-fns/locale";
import { isThisMonth, separateEventsByMonth } from "../utils/date";
import { computed, onMounted, ref } from "vue";
import { Agenda } from "../utils/types";
import Header from "../components/header.vue";

const schedule = ref<Agenda[]>([]);

async function updateSchedule() {
  const response = await fetch("http://localhost:3000/schedule");
  const data = await response.json();

  schedule.value = data;
}

function removeSchedule(agendaId: string) {
  const index = schedule.value.findIndex((item) => item.id === agendaId);
  if (index !== -1) {
    schedule.value.splice(index, 1);
  }
}

const filterMonth = computed(() => {
  return schedule.value.filter((agenda) => {
    const agendaDate = parse(
      agenda.date.end,
      "HH:mm",
      new Date(agenda.date.start)
    );
    const currentDate = new Date();

    return agendaDate >= currentDate && agenda.cancelled === false;
  });
});

const sortMonth = computed(() => {
  return filterMonth.value.sort(
    (a, b) =>
      new Date(b.date.start).getTime() - new Date(a.date.start).getTime()
  );
});

const eventsByMonth = computed(() => {
  return separateEventsByMonth(sortMonth.value);
});

const isLoading = ref(true);

onMounted(async () => {
  try {
    const data = await fetch("http://localhost:3000/schedule");
    const response: Agenda[] = await data.json();

    schedule.value.push(...response);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <Header :updateSchedule="updateSchedule" />
  <main>
    <div class="container" v-for="(agendas, month) in eventsByMonth">
      <p v-if="isThisMonth(month)">
        {{
          format(parse(month, "MM/yyyy", new Date()), "MMMM", { locale: ptBR })
        }}
      </p>
      <div class="schedule">
        <Schedule
          v-if="filterMonth.length > 0"
          :updateSchedule="updateSchedule"
          :removeSchedule="removeSchedule"
          v-for="agenda in agendas"
          :key="agenda.id"
          :agenda="agenda"
        />
      </div>
    </div>
    <p class="emptyEvents" v-if="!isLoading && filterMonth.length === 0">
      Nenhum evento marcado
    </p>
  </main>
</template>

<style lang="scss" scoped>
main {
  max-width: 900px;
  width: 100%;
  margin-bottom: 6rem;
  display: flex;
  flex-direction: column-reverse;

  .container {
    display: flex;
    flex-direction: column;

    .schedule {
      display: flex;
      flex-direction: column-reverse;
      gap: 1rem;
    }

    p {
      margin: 1rem;
      font-size: 2rem;
      font-weight: 800;
    }
  }

  .emptyEvents {
    font-size: 3rem;
    font-weight: 800;
    margin: 0 auto;
  }
}
</style>
