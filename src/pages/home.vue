<script setup lang="ts">
import { format, parse, parseISO } from "date-fns";
import Schedule from "../components/schedule.vue";
import { ptBR } from "date-fns/locale";
import { agendas } from "../utils/agendas";
import { isThisMonth, separateEventsByMonth } from "../utils/date";

const filterMonth = agendas.filter((agenda) => {
  const agendaDate = parseISO(agenda.date.end);
  const currentDate = new Date();

  return agendaDate >= currentDate;
});

const sortMonth = filterMonth.sort(
  (a, b) => new Date(b.date.start).getTime() - new Date(a.date.start).getTime()
);

const eventsByMonth = separateEventsByMonth(sortMonth);
</script>

<template>
  <main>
    <div class="container" v-for="(agendas, month) in eventsByMonth">
      <p v-if="isThisMonth(month)">
        {{
          format(parse(month, "MM/yyyy", new Date()), "MMMM", { locale: ptBR })
        }}
      </p>
      <div class="schedule">
        <Schedule v-for="agenda in agendas" :key="agenda.id" :agenda="agenda" />
      </div>
    </div>
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
      margin-left: 2rem;
      margin: 1rem 0;
      font-size: 2rem;
      font-weight: 800;
    }
  }
}
</style>
