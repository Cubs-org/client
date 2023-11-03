import { Task } from "./task";

export interface CalendarProps {
  year?: number;
  month?: number;
  day?: number;
  num?: number;
  event?: (e: string) => void;
  tasks?: Task[];
}

export interface DateProps {
    initialDate: string;
    finalDate: string;
}
