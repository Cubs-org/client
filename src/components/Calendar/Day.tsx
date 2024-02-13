import clsx from "clsx"
import { today } from "../../utils/calendar/rangeGridCalendar";
import { Timeline } from "./Charts/MonthTimeline";
import { useModal } from "../../contexts/modalContext";
import { AmountRemaingTasks } from "./AmountRemaingTasks";
import { FaAngleUp } from "react-icons/fa6";
import { EditTask } from "./EditTask";

interface IDayProps {
    day: string;
    event?: (date:string) => void;
    items?: any;
    month?: number;
}

export const Day = ({ day, month, event, items }:IDayProps) => {

    const { openModal } = useModal();

    const handleOpenTimeline = (item: any, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        openModal({
            content: <EditTask task={item} />
        });
    };

    const handlePushitems = (items:any, date:string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        let amountitems = [] as any;
        items.map(item => item.timeline.filter(timeline => ((timeline.day === date) && (timeline.hierarchy >= 3)) && amountitems.push(item)))
        
        openModal && openModal({
            content: <AmountRemaingTasks items={amountitems}/>
        });
    }

    return (
        <div 
            className={`
                flex-1
                w-full
                min-h-full
                relative
                p-2
                md:rounded-md
                flex
                justify-end
                items-end
                cursor-pointer
                ring-1
                ring-light-500
                dark:ring-dark-600 md:dark:ring-dark-800
                ${+day.split('-')[1] !== month ? "bg-light-300 dark:bg-dark-700" : "bg-light-200 dark:bg-dark-800 hover:bg-light-300 dark:hover:bg-dark-700"}
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
                        range={timeline.range}
                        hierarchy={timeline.hierarchy}
                        handle={handleOpenTimeline}
                    />
                ))
            })}

            {items.some(item => item?.timeline.some(timeline => timeline.day === day && timeline.hierarchy >= 3)) && (
                <div 
                    className="absolute z-0 left-[5px] bottom-[5px] w-fit p-1 rounded-md bg-light-400 dark:bg-dark-400 hover:bg-light-300 dark:hover:bg-dark-300"
                    onClick={(event) => handlePushitems(items, day, event)}
                ><FaAngleUp size={12}/></div>
            )}
        </div>
    )
}