import { CalendarProps } from "../../interfaces/calendar";

import rangeGridCalendar from "../../utils/calendar/rangeGridCalendar";

import { Week } from "./Week";
import { createTimelines } from "../../utils/calendar/createTimelines";

export const GridMonthCalendar = ({ year, month, event, items }:CalendarProps) => {

    const data: string[][] = rangeGridCalendar({ year, month });

    createTimelines(items, data);

    console.log(items);

    const gridElements = data.map((week, index) => (
        <Week 
            key={`${week}-${index}`} 
            week={week}
            month={month}
            event={event}
            items={items}
        />
    ));
  
    return (
        <div 
            className="flex flex-col flex-grow gap-[2px] md:gap-[5px] p-1 overflow-y-scroll overflow-x-hidden scrollbar-none md:scrollbar scrollbar-thumb-light-300 dark:scrollbar-thumb-dark-700 scrollbar-track-transparent"
        >{gridElements}</div>
    )
}