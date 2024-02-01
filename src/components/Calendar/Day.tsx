import clsx from "clsx"
import { today } from "../../utils/calendar/rangeGridCalendar";
import { Timeline } from "./Charts/MonthTimeline";

interface IDayProps {
    day: string;
    event?: (date:string) => void;
    items?: any;
    month?: number;
}

export const Day = ({ day, month, event, items }:IDayProps) => {

    // const handleOpenTimeline = (item: any, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //     event.stopPropagation();

    //     // @ts-ignore
    //     openModal && openModal({
    //         // @ts-ignore
    //         content: <Edititem item={item} onClose={closeModal} />
    //     });
    // };

    // const handlePushitems = (items:any, date:string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //     event.stopPropagation();

    //     let amountitems = [] as any;
    //     items.map(item => (item.hierarchy && item.hierarchy >= 4) && (item?.timeline?.includes(date)) && amountitems.push(item));
    //     // @ts-ignore
    //     openModal && openModal({
    //         content: <AmountRemaingTasks tasks={amountitems}/>
    //     });
    // }

    return (
        <div 
            className={`
                flex-1
                w-full h-full
                relative
                p-2
                md:rounded-md
                flex
                justify-end
                items-end
                cursor-pointer
                ring-1
                ring-light-500
                dark:ring-dark-800
                ${+day.split('-')[1] !== month ? "bg-light-300 dark:bg-dark-300" : "bg-light-200 dark:bg-dark-600 hover:bg-light-300 dark:hover:bg-dark-700"}
            `}
            onClick={() => event && event(day)}
        >
            <span className={clsx("w-6 h-6 text-xs font-medium grid place-items-center rounded-md", {
                "bg-purple-500 text-light-100 font-semibold": today === day,
            })}>
                {+day.split("-")[2]}
            </span>

            {items.map(item => {
                return item?.timeline.map((timeline, index) => timeline.day === day && (
                    <Timeline 
                        key={index} 
                        item={item} 
                        width={timeline.range} 
                        index={index}
                        range={timeline.range}
                        hierarchy={timeline.hierarchy}
                    />
                ))
            })}
        </div>
    )
}