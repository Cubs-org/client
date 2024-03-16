import { CalendarProps } from "../../interfaces/calendar";

import rangeGridCalendar from "../../utils/calendar/rangeGridCalendar";

import { Week } from "./Week";
import { createTimelines } from "../../utils/calendar/createTimelines";
import clsx from "clsx";
import { useSearchParams } from "react-router-dom";

interface Items {
    id: string;
    title: string;
    properties: any[];
    timeline?: { day: string; range: number }[];
    totalProperties?: {index: number, h: number}[];
    onNewItemCreated: (item: any) => void;
}

export const GridMonthCalendar = ({ 
    year, 
    month, 
    event, 
    items, 
    isPage=false, 
    onNewItemCreated,
    onItemDeleted
}:CalendarProps) => {

    const [searchParams] = useSearchParams();

    const filterBy = searchParams.get("filterBy");
    let filter = filterBy === "Tarefas" ? "task" : filterBy === "Eventos" ? "event" : "all";
    let _items = items as Items[];
    _items = _items.filter(item => {
        if (filter === "all") return item;
        return item.properties.some(prop => prop.type === "calendar" && prop.title === filter);
    });

    const data: string[][] = rangeGridCalendar({ year, month });
    let _weekHeight = [] as any;

    createTimelines(items, data);

    const adjustWeekHeight = (data: string[][]) => {
    
        data.forEach((week, index) => {
            let totalProperties = 0;
    
            week.forEach(day => {
                const dayItems = (items as Items[]).filter(item =>
                    item.timeline && item.timeline.some(
                        timeline => (
                            timeline.day === day &&
                            item.properties.find(prop => prop.type === "datetime").data.end.split("T")[0] !== day
                        )
                    )
                );
    
                dayItems.forEach(item => {
                    totalProperties += item.properties.length;
                });
            });
    
            _weekHeight.push({ index: index, h: totalProperties });
        });
    };

    adjustWeekHeight(data);

    const gridElements = data.map((week, index) => (
        <Week 
            key={`${week}-${index}`} 
            week={week}
            month={month}
            event={event}
            items={_items}
            isPage={isPage}
            weekHeight={_weekHeight}
            index={index}
            onNewItemCreated={onNewItemCreated}
            onItemDeleted={onItemDeleted}
        />
    ));
  
    return (
        <div 
            className={clsx("flex flex-col gap-[2px] md:gap-[5px] p-1 scrollbar-none overflow-y-scroll overflow-x-hidden", {
                "md:scrollbar scrollbar-thumb-light-300 dark:scrollbar-thumb-dark-700 scrollbar-track-transparent": isPage,
                "flex-grow" : !isPage
            })}
        >{gridElements}</div>
    )
}