import clsx from "clsx"
import { today } from "../../utils/calendar/rangeGridCalendar";
import { Timeline } from "./Charts/MonthTimeline";
import { useModal } from "../../contexts/modalContext";
import { AmountRemaingTasks } from "./AmountRemaingTasks";
import { FaAngleUp } from "react-icons/fa6";
import { EditItem } from "./EditItem";
import { CustomTimeline } from "./Charts/CustomTimeline";
import isDateInRange from "../../utils/calendar/isDateInRange";

interface IDayProps {
    day: string;
    event?: (date:string) => void;
    items?: any;
    month?: number;
    isPage?: boolean;
    onNewItemCreated: (item: any) => void;
}

export const Day = ({ day, month, event, items, isPage=false, onNewItemCreated }:IDayProps) => {

    const { openModal } = useModal();

    const handleOpenTimeline = (item: any, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        const isCalendar = item?.properties?.find(prop => prop.type === "calendar");

        if (isCalendar) {
            openModal({
                content: <EditItem task={item} onUpdateAnyTask={onNewItemCreated} />
            });
        }
    };

    const handlePushitems = (items:any, date:string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        let amountitems = [] as any;
        items.map(item => item.timeline.filter(timeline => ((timeline.day === date) && (timeline.hierarchy >= 3)) && amountitems.push(item)))
        
        openModal({
            content: <AmountRemaingTasks items={amountitems} onUpdateAnyTask={onNewItemCreated}/>
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
                flex-col
                items-end
                cursor-pointer
                ring-1
                ring-light-500
                dark:ring-dark-600 md:dark:ring-dark-800
                ${!isPage ? "justify-end" : "justify-between gap-2"}
                ${+day.split('-')[1] !== month ? "bg-light-300 dark:bg-dark-700 hover:bg-light-400 dark:hover:bg-dark-600" : "bg-light-200 dark:bg-dark-800 hover:bg-light-300 dark:hover:bg-dark-700"}
            `}
            onClick={() => event && event(day)}
        >
            {items.sort((a, b) => {
                const hierarchyA = a.timeline.find(timeline => timeline.day === day)?.hierarchy || 0;
                const hierarchyB = b.timeline.find(timeline => timeline.day === day)?.hierarchy || 0;
                return hierarchyA - hierarchyB;
            }).map((item, _i) => {
                if (!isPage) {
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
                } else {
                    const start = item?.properties?.find((p: any) => p.type === "datetime").data.start.split(" ")[0];
                    const end = item?.properties?.find((p: any) => p.type === "datetime").data.end.split(" ")[0];

                    // console.log(item?.timeline.sort((a, b) => a?.hierarchy - b?.hierarchy));

                    if (isDateInRange(day, start, end) && (end !== day)) {
                        return (
                            <CustomTimeline 
                                key={_i} 
                                isFirst={start === day}
                                item={item}
                                handle={handleOpenTimeline}
                            />
                        )
                    } 
                    // else {
                    //     // adicionar botão de '+'
                    //     if (_i === 0)
                    //         return <span className="opacity-0">::</span>;
                    // }
                }
            })}

            {items.some(item => item?.timeline.some(timeline => timeline.day === day && timeline.hierarchy >= 3)) && !isPage && (
                <div 
                    className="absolute z-0 left-[5px] bottom-[5px] w-fit p-1 rounded-md bg-light-400 dark:bg-dark-400 hover:bg-light-300 dark:hover:bg-dark-300"
                    onClick={(event) => handlePushitems(items, day, event)}
                ><FaAngleUp size={12}/></div>
            )}

            <span className={clsx("w-6 h-6 text-xs font-medium grid place-items-center rounded-md", {
                            "bg-purple-500 text-light-100 font-semibold": today === day,
                        })}>
                {+day.split("-")[2]}
            </span>
        </div>
    )
}