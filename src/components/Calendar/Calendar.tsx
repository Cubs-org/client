import { Suspense, useState } from "react";

import { CalendarProps } from "../../interfaces/calendar";
import { Task } from "../../interfaces/task";

import { adjustTasks } from "../../utils/calendar/adjustTasks";

import { GridCalendar } from "./GridCalendar";
import { HeaderCalendar } from "./HeaderCalendar";
import Loading from "../Loading";
import { useModal } from "../../contexts/modalContext";
import { CreateTask } from "./CreateTask";

export default function CalendarPage() {
  const [tasks, setTasks] = useState();

  // @ts-ignore
  const { modalState:{ visible, content }, openModal, closeModal } = useModal();

  const response = (event) => {
      // @ts-ignore
      openModal && openModal({
          content: <CreateTask event={event} onClose={closeModal} /> 
      });
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Calendar 
        event={response} 
        tasks={tasks} 
      />
    </div>
  );
}

const Calendar = ({event, tasks}: CalendarProps) => {
  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

  const splitDt = (date:any) => {
    let year, month, day;
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();

    return [year, month, day];
  }
  
  const [date, setDate] = useState<Date>(new Date());
  const [year, setYear] = useState(splitDt(date)[0]);
  const [month, setMonth] = useState(splitDt(date)[1]);

  const _tasks:Task[] = tasks && tasks.length > 0 ? adjustTasks(tasks) : [];

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full h-full flex flex-col">
        <HeaderCalendar 
          date={date} 
          year={year} 
          month={month}
          setDate={setDate}
          setYear={setYear}
          setMonth={setMonth}
          splitDt={splitDt}
        />
        <div className="w-full flex gap-2 mb-[5px] place-items-center p-1">
          {weekDays.map((day, key) => (
            <div key={`${day}-${key}`} className="w-full text-center font-semibold">
              {day}
            </div>
          ))}
        </div>
        <GridCalendar
          year={year} 
          month={month} 
          event={event} 
          tasks={_tasks}
        />
      </div>
    </Suspense>
  );
};