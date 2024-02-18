import { CalendarProps } from "../../interfaces/calendar";

import rangeGridCalendar from "../../utils/calendar/rangeGridCalendar";

import { Week } from "./Week";
import { createTimelines } from "../../utils/calendar/createTimelines";
import clsx from "clsx";

export const GridMonthCalendar = ({ year, month, event, items, isPage=false }:CalendarProps) => {

    const data: string[][] = rangeGridCalendar({ year, month });
    let _weekHeight = [] as any;

    createTimelines(items, data);

    const adjustWeekHeight = (data: string[][]) => {
    
        data.forEach((week, index) => {
            let totalProperties = 0;
    
            week.forEach(day => {
                const dayItems = (items as any[]).filter(item =>
                    item.timeline.some(timeline => timeline.day === day)
                );
    
                dayItems.forEach(item => {
                    totalProperties += item.properties.length;
                });
            });
    
            _weekHeight.push({ index: index, h: totalProperties });
        });
    };

    adjustWeekHeight(data);

    console.log(_weekHeight);


    const gridElements = data.map((week, index) => (
        <Week 
            key={`${week}-${index}`} 
            week={week}
            month={month}
            event={event}
            items={items}
            isPage={isPage}
            weekHeight={_weekHeight}
            index={index}
        />
    ));
  
    return (
        <div 
            className={clsx("flex flex-col flex-grow gap-[2px] md:gap-[5px] p-1 scrollbar-none overflow-y-scroll overflow-x-hidden", {
                "md:scrollbar scrollbar-thumb-light-300 dark:scrollbar-thumb-dark-700 scrollbar-track-transparent": isPage
            })}
        >{gridElements}</div>
    )
}