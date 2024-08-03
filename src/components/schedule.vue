<script setup lang="ts">
import DropdownMenu from "./dropdown-menu.vue";
import { ref } from "vue";
import { PhClock, PhMapPin } from "@phosphor-icons/vue";
import Invites from "./invites.vue";
import { format, isAfter } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Agenda } from "../utils/types";

defineProps<{
  agenda: Agenda;
}>();

const isDropdownOpen = ref(false);

const handleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const isToday = (date: string) => {
  const today = new Date();
  return (
    format(date, "dd/MM/yyyy") === format(today, "dd/MM/yyyy") &&
    new Date(today).getTime() < new Date(date).getTime()
  );
};

const isPastRemoveButton = (date: string) => {
  const today = new Date();
  return isAfter(date, today) || isToday(date);
};
</script>

<template>
  <div class="container">
    <div :class="{ 'container-event': true, open: isDropdownOpen }">
      <div class="event">
        <div class="event-date-time">
          <div :class="{ 'event-date': true, today: isToday(agenda.date.end) }">
            <h2 class="event-day">
              {{
                format(agenda.date.start, "EEEE", { locale: ptBR }).slice(0, 3)
              }}
            </h2>
            <h2 class="event-date-number">
              {{ format(agenda.date.start, "dd") }}
            </h2>
          </div>

          <span class="divide" />

          <div class="event-details">
            <div class="event-time">
              <PhClock :size="16" weight="fill" />
              <p>
                {{ format(agenda.date.start, "HH:mm") }} :
                {{ format(agenda.date.end, "HH:mm") }}
              </p>
            </div>

            <div class="event-location">
              <PhMapPin :size="16" weight="fill" />
              <p>{{ agenda.location }}</p>
            </div>
          </div>

          <div class="event-title-participants">
            <p>{{ agenda.title }}</p>
            <Invites :invites="agenda.invites" />
          </div>
        </div>

        <DropdownMenu
          v-if="isPastRemoveButton(agenda.date.start)"
          :isDropdownOpen="isDropdownOpen"
          @toggleDropdown="handleDropdown"
          @closeDropdown="closeDropdown"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 3rem;

  .container-event {
    display: flex;
    width: 100%;
    border: 1px solid #e6e6e6;
    border-radius: 1rem;
    padding: 2rem 3rem;

    &.open {
      background-color: #f8f8f8;
    }

    .event {
      display: flex;
      width: 100%;
      gap: 4rem;
      justify-content: space-between;
      align-items: center;

      .event-date-time {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 3rem;
        height: 100%;

        .event-date {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          color: #575859;

          &.today {
            color: #e4511e;
          }

          .event-day {
            font-size: 2rem;
          }

          .event-date-number {
            font-size: 4rem;
          }
        }

        .divide {
          width: 2px;
          height: 100%;
          background-color: #e8e8e8;
        }

        .event-details {
          color: rgb(100, 100, 100);
        }

        .event-details,
        .event-title-participants {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          font-size: 1.4rem;
          font-weight: 500;

          .event-time,
          .event-location {
            display: flex;
            align-items: center;
            gap: 1rem;

            p {
              width: 10rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .icon {
              color: rgb(100, 100, 100);
            }
          }
        }
      }
    }
  }
}
</style>
