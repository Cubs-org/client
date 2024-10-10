import { useState } from "react";
import { CalendarProps } from "../../types/calendar";
import { splitDt } from "../../utils/datetime/splitDate";
import { HeaderCalendar } from "./HeaderCalendar";
import { GridMonthCalendar } from "./GridMonthCalendar";

export const Calendar = ({ 
    event, 
    items, 
    isPage=false 
}: CalendarProps) => {
    const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];

    const [date, setDate] = useState<Date>(new Date());
    const [year, setYear] = useState(splitDt(date)[0]);
    const [month, setMonth] = useState(splitDt(date)[1]);

    return (
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
                isPage={isPage}
            />
        </div>
    );
};