import { CalendarProps } from "../../interfaces/calendar";

import rangeGridCalendar from "../../utils/calendar/rangeGridCalendar";

import { useModal } from "../../contexts/modalContext";
import { Week } from "./Week";
import { addTimelinesInItems } from "../../utils/calendar/createTimelines";

export const GridMonthCalendar = ({ year, month, event, items }:CalendarProps) => {

    const data: string[][] = rangeGridCalendar({ year, month });

    addTimelinesInItems(items, data);

    console.log("Items::", items);


    // @ts-ignore
    const { modalState:{ visible, content }, openModal, closeModal } = useModal();

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
            className="flex flex-col flex-grow gap-[2px] md:gap-[5px] overflow-x-hidden overflow-y-auto"
        >{gridElements}</div>
    )
}