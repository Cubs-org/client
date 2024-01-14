import { Project } from "./project";
import { Task } from "./task";

export interface CalendarItems {
  tasks: Task[];
  projects: Project[];
};

export interface CalendarProps {
  year?: number;
  month?: number;
  day?: number;
  num?: number;
  event?: (e: any) => void;
  items?: CalendarItems | [];
}

export interface DateProps {
    initialDate: string;
    finalDate: string;
}
