import { format, getMonth, parse, parseISO } from "date-fns";
import { Agenda, monthAgenda } from "./types";
import { agendas } from "./agendas";

export const filterMonth = agendas.filter((agenda) => {
  const agendaDate = parseISO(agenda.date.start);
  const currentDate = new Date();

  return format(agendaDate, "MM/yyyy") > format(currentDate, "MM/yyyy");
});

export function separateEventsByMonth(agendas: Agenda[]): monthAgenda {
  return agendas.reduce((acc: monthAgenda, agenda: Agenda) => {
    const month = format(agenda.date.start, "MM/yyyy");

    if (!acc[month]) {
      acc[month] = [];
    }

    acc[month].push(agenda);

    return acc;
  }, {});
}

export const isThisMonth = (dates: string) => {
  const currentDate = new Date();
  const date = format(parse(dates, "MM/yyyy", new Date()), "MM");

  return getMonth(date) !== getMonth(currentDate);
};
