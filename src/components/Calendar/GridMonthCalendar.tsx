import { CalendarProps } from "../../interfaces/calendar";

import rangeGridCalendar from "../../utils/calendar/rangeGridCalendar";

import { useModal } from "../../contexts/modalContext";
import { Week } from "./Week";

import rangeDifferenceBetweenDates from "../../utils/calendar/rangeDifferenceBetweenDays";
import isDateInRange from "../../utils/calendar/isDateInRange";

export const GridMonthCalendar = ({ year, month, event, items }:CalendarProps) => {

    const data: string[][] = rangeGridCalendar({ year, month });

    // console.log(data);

    const addTimelinesInItems = () => {
        let _items = items as any[];

        for (let k = 0; k < _items.length; k++) {
            let item = _items[k];
            let timeline = [] as any;

            if (item?.startDate && item?.endDate) {
                for (let i = 0; i < data.length; i++) {
                    const week = data[i];

                    for (let j = 0; j < week.length; j++) {
                        // const firstDay = week[0];
                        // const lastDay = week[6];
                        const day = week[j];

                        if (
                            isDateInRange(day, item?.startDate, item?.endDate)
                        ) {
                            timeline.push({
                                day, 
                                range: rangeDifferenceBetweenDates({initialDate:day, finalDate:item.endDate})
                            });
                            // console.log("Timeline::", timeline);
                        }
                    }
                }
            }

            _items[k].timeline = timeline;
        }
    }

    addTimelinesInItems();

    console.log("items::", items);


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