import clsx from "clsx";

import { CalendarProps } from "../../interfaces/calendar";
import { Task } from "../../interfaces/task";

import rangeDifferenceBetweenDates from "../../utils/calendar/rangeDifferenceBetweenDays";
import rangeGridCalendar, { today } from "../../utils/calendar/rangeGridCalendar";

import { FaAngleUp } from "react-icons/fa";
import { AmountRemaingTasks } from "./AmountRemaingTasks";

import { useModal } from "../../contexts/modalContext";

export const GridMonthCalendar = ({ year, month, event, items }:CalendarProps) => {
    const data: string[][] = rangeGridCalendar({ year, month });

    // @ts-ignore
    const { modalState:{ visible, content }, openModal, closeModal } = useModal();

    const handleOpenTimeline = (task: Task, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        // @ts-ignore
        openModal && openModal({
            // @ts-ignore
            content: <EditTask task={task} onClose={closeModal} />
        });
    };

    const handlePushTasks = (tasks:Task[], date:string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        let amountTasks:Task[] = [];
        tasks.map(task => (task.hierarchy && task.hierarchy >= 4) && (task?.timeline?.includes(date)) && amountTasks.push(task));
        // @ts-ignore
        openModal && openModal({
            content: <AmountRemaingTasks tasks={amountTasks}/>
        });
    }

    const tasks:Task[] = [] || items;

    const gridElements = data.map((row, _i) => (
        <div 
            key={`${row}-${_i}`} 
            className="flex gap-[2px] md:gap-[5px] place-items-center flex-grow"
        >
            {row.map((col, _i) => (
                <div
                    key={`${col}-${_i}`}
                    className={`
                        flex-1
                        w-full h-full
                        relative
                        p-3
                        text-sm
                        md:text-base
                        md:rounded-md
                        flex
                        justify-end
                        items-end
                        cursor-pointer
                        ring-1
                        ring-light-500
                        dark:ring-dark-800
                        ${+col.split('-')[1] !== month ? "bg-light-300 dark:bg-dark-300" : "bg-light-200 dark:bg-dark-600 hover:bg-light-300 dark:hover:bg-dark-700"}
                    `}
                    onClick={() => event && event(col)}
                >
                    <div className="absolute top-0 left-0 w-full h-full">
                        {tasks?.map(task => task.timeline?.map((item, _i) => item == col ? (
                            <div
                            key={`${item}-${_i}`}
                            className={clsx(`absolute bg-${task.tag.color}-500 min-h-[16px] max-h-[16px] md:min-h-[18px] md:max-h-[18px] px-[5px] flex items-center font-semibold text-[.8em] md:text-[12px] rounded-md`, {
                                // position based on hierarchy of tasks
                                "top-0" : task.hierarchy === 1,
                                "top-[18px] md:top-[20px]" : task.hierarchy === 2,
                                "top-[36px] md:top-[40px]" : task.hierarchy === 3,
                                "hidden" : task.hierarchy && task.hierarchy >= 4
                            })}
                            style={{
                                width: `${(rangeDifferenceBetweenDates({initialDate:col, finalDate:task.end})) * 100}%`,
                                zIndex: _i == 0 ? 30 : 20
                            }}
                            onClick={(event) => handleOpenTimeline(task, event)}
                            >
                            {_i == 0 && (
                                <span className="text-dark-900">{task.title} - {task.days}d</span>
                            )}
                            </div>
                        ) : null))}
                    </div>
                {tasks?.map((task, key) => (
                    task?.timeline?.includes(col) && (task?.hierarchy && task?.hierarchy >= 4) && (
                    <div 
                        key={`${task}-${key}`}
                        className="absolute z-30 md:block hidden left-[5px] bottom-[5px] min-w-[10px] min-h-[10px] p-1 rounded-sm bg-light-400 text-dark-100 dark:bg-dark-400 hover:bg-purple-600 group"
                        onClick={event => handlePushTasks(tasks, col, event)}
                    ><FaAngleUp size={18} className="group-hover:text-light-100" />
                    </div>
                    )
                ))}
                <span className={`${today == col ? "!absolute w-[30px] h-[30px] bg-purple-500 font-semibold text-light-300" : "font-medium text-dark-600 dark:text-light-900"} relative z-30 grid place-items-center rounded-md text-xs`}>
                    {+col.split("-")[2]}
                </span>
                </div>
            ))}
        </div>
    ));
  
    return <div className="flex flex-col flex-grow gap-[2px] md:gap-[5px]">{gridElements}</div>;
}