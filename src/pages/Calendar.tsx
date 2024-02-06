import { Suspense, useState } from "react";

import { CalendarProps } from "../interfaces/calendar";

import { GridMonthCalendar } from "../components/Calendar/GridMonthCalendar";
import { HeaderCalendar } from "../components/Calendar/HeaderCalendar";
import Loading from "../components/Loading";
import { useModal } from "../contexts/modalContext";
import { CreateTask } from "../components/Calendar/CreateTask";
import { splitDt } from "../utils/datetime/splitDate";

export default function CalendarPage() {
  
  const items:any = [
    {title: "Rever os commits da semana passada", startDate: "2024-01-01", endDate: "2024-01-29", color: "red", createdAt: "2024-01-01 23:41:04.891", updatedAt: "2024-02-02 15:55:04.891", completed: false},
    {title: "Estudar para as provas finais", startDate: "2024-01-01", endDate: "2024-01-29", color: "yellow", createdAt: "2024-01-01 23:41:04.892", updatedAt: "2024-02-02 15:55:04.891", completed: true},
    {title: "Planejamento Cub's", startDate: "2024-01-01", endDate: "2024-02-28", color: "blue", createdAt: "2024-01-13 23:44:04.895", updatedAt: "2024-02-02 15:55:04.892", completed: true},
    {title: "Cub's meeting", startDate: "2024-01-29", endDate: "2024-02-28", color: "green", createdAt: "2024-01-13 23:44:04.895", updatedAt: "2024-02-02 15:55:04.892", completed: true},
    {title: "Cub's meeting (1)", startDate: "2024-01-29", endDate: "2024-02-28", color: "green", createdAt: "2024-01-13 23:44:04.895", updatedAt: "2024-02-02 15:55:04.892", completed: true},
    {title: "Cub's meeting (2)", startDate: "2024-01-29", endDate: "2024-02-28", color: "blue", createdAt: "2024-01-13 23:44:04.896", updatedAt: "2024-02-02 15:55:04.892", completed: true},
  ];

  // @ts-ignore
  const { modalState:{ visible, content }, openModal, closeModal } = useModal();

  const response = (event) => {
      // @ts-ignore
      openModal && openModal({
          content: <CreateTask event={event} /> 
      });
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Calendar 
        event={response} 
        items={items} 
      />
    </div>
  );
}

const Calendar = ({event, items}: CalendarProps) => {
  const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
  
  const [date, setDate] = useState<Date>(new Date());
  const [year, setYear] = useState(splitDt(date)[0]);
  const [month, setMonth] = useState(splitDt(date)[1]);

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
        />
        <div className="w-full flex gap-2 mb-[5px] place-items-center p-1">
          {weekDays.map((day, key) => (
            <div key={`${day}-${key}`} className="w-full text-center font-semibold">
              {day}
            </div>
          ))}
        </div>
        <GridMonthCalendar
          year={year} 
          month={month} 
          event={event} 
          items={items}
        />
      </div>
    </Suspense>
  );
};