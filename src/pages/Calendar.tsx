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
    // {
    //   title: "Projeto Cub's",
    //   owner: "",
    //   properties: [
    //     { id: "", name: "Descrição", type: "text", data: { value: "Reunião com o cliente para discutir sobre o novo projeto" } },
    //     { id: "", name: "Data", type: "datetime", data: { start: "2024-01-25 00:00:00.000", end: "2024-02-25 23:59:00.000" } },
    //     { id: "", name: "event", type: "calendar", data: { color: "yellow" } },
    //     { id: "", name: "status", type: "checkbox", data: { value: true} },
    //   ],
    //   createdAt: "2024-01-25 10:30:00.000",
    //   updatedAt: "2024-02-05 08:45:00.000",
    // },
    {
      title: "@Hoje",
      owner: "",
      properties: [
        // { id: "", name: "Treinar", type: "checkbox", data: { value: true } },
        // { id: "", name: "Estudar e meditar", type: "checkbox", data: { value: true } },
        // { id: "", name: "Tomar 2l de água", type: "checkbox", data: { value: true } },
        { id: "", name: "Data", type: "datetime", data: { start: "2024-02-16 00:00:00.000", end: "2024-02-16 23:59:00.000" } },
        { id: "", name: "Tags", type: "multi-select", data: { 
            items: [
              { name: "Saúde", color: "green" },
              { name: "Trabalho", color: "pink" },
              { name: "Estudos", color: "blue" },
              { name: "Lazer", color: "indigo" }
            ] 
          } 
        },
      //   { id: "", name: "Categoria", type: "select", data: { 
      //     items: [
      //       { name: "Saúde", color: "green" },
      //       { name: "Trabalho", color: "yellow" },
      //       { name: "Estudos", color: "blue" },
      //       { name: "Lazer", color: "orange" }
      //     ],
      //     value: "Saúde"
      //   } 
      // },
      ],
      createdAt: "2024-01-25 10:30:00.001",
      updatedAt: "2024-02-16 08:45:00.001",
    },
    // {
    //   title: "Teste",
    //   owner: "",
    //   properties: [
    //     { id: "", name: "Descrição", type: "text", data: { value: "Reunião com o cliente para discutir sobre o novo projeto" } },
    //     { id: "", name: "Data", type: "datetime", data: { start: "2024-01-29 00:00:00.001", end: "2024-02-03 23:59:00.000" } },
        
    //     { id: "", name: "Membros", type: "assign", data: { members: [{ name:"john doe", email: "jd@address.domain", icon: "leao" }, { name:"mary monroe", email: "marmor@address.domain", icon: "raposa" }] } },

    //     { id: "", name: "status", type: "status", data: { value: "Não iniciado" } },

    //     { id: "", name: "Tags", type: "multi-select", data: { value: "Não iniciado" } },

    //     { id: "", name: "Número", type: "number", data: { value: "65", format:"progress" } },
    //     { id: "", name: "Número", type: "number", data: { value: "100", format:"radial" } },
    //   ],
    //   createdAt: "2024-02-18 10:30:00.001",
    //   updatedAt: "2024-03-05 08:45:00.001",
    // }
  ];  

  // @ts-ignore
  const { modalState:{ visible, content }, openModal, closeModal } = useModal();

  const response = (event) => {
      var dt = event.concat("T00:00:00.000");
      openModal && openModal({
          content: <CreateTask event={dt} /> 
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