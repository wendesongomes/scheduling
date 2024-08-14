import { format, getMonth, parse } from "date-fns";
import { Agenda, monthAgenda } from "./types";

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
