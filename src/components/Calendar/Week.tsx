import { Day } from "./Day";

interface IWeek {
    week: string[];
    month?: number;
    event?: (date:string) => void;
    items?: any;
}

export const Week = ({ week, month, items, event }:IWeek) => {

    return (
        <div
            className="flex gap-[2px] md:gap-[5px] place-items-center flex-grow"
        >
            {week.map((day, _i) => (
                <Day 
                    key={`${day}-${_i}`} 
                    day={day} 
                    month={month}
                    event={event} 
                    items={items} 
                />
            ))}
        </div>
    )
}