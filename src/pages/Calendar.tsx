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
    {
      title: "Rever os commits da semana passada",
      description: "Rever os commits da semana passada",
      properties: {
        "date": {
          start: "2024-01-29 10:30:00.000",
          end: "2024-02-29 10:30:00.000",
        },
        "itemType": {
          title: "task",
          color: "red",
        },
        "completed": false,
      },
      createdAt: "2024-01-01 23:41:04.891",
      updatedAt: "2024-02-02 15:55:04.891",
    },
    {
      title: "Reunião de equipe",
      description: "Reunião semanal de equipe para revisar o progresso e definir metas.",
      properties: {
        "date": {
          start: "2024-02-05 10:30:00.000",
          end: "2024-02-05 10:30:00.000",
        },
        "itemType": {
          title: "event",
          color: "blue",
        },
        "completed": true,
      },
      createdAt: "2024-01-15 10:30:00.000",
      updatedAt: "2024-02-05 08:45:00.000",
    },
    {
      title: "Lembrete: Pagar a conta de energia",
      description: "Não esquecer de pagar a conta de energia até o final do dia.",
      properties: {
        "date": {
          start: "2024-02-07 10:30:00.000",
          end: "2024-02-07 10:30:00.000",
        },
        "itemType": {
          title: "reminder",
          color: "green",
        },
        "completed": false,
      },
      createdAt: "2024-02-03 18:00:00.000",
      updatedAt: "2024-02-03 18:00:00.000",
    },
    {
      title: "Hábitos",
      description: "",
      properties: {
        "date": {
          start: "2024-02-12 00:00:00.000",
          end: "2024-02-12 00:00:00.000",
        },
        "category": {
          title: "reminder",
          color: "green",
        },
        "completed": false,
      },
      createdAt: "2024-02-03 18:00:00.000",
      updatedAt: "2024-02-03 18:00:00.000",
    },
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