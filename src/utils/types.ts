export interface DateInfo {
  start: string;
  end: string;
}

export interface Agenda {
  id: string;
  date: DateInfo;
  location: string;
  title: string;
  invites: string[];
  cancelled: boolean;
}

export type monthAgenda = Record<string, Agenda[]>;
