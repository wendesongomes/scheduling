export interface DateInfo {
  start: string;
  end: string;
}

export interface Agenda {
  id: number;
  date: DateInfo;
  location: string;
  title: string;
  invites: string[];
}

export type monthAgenda = Record<string, Agenda[]>;
