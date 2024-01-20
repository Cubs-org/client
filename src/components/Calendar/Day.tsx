import clsx from "clsx"
import rangeDifferenceBetweenDates from "../../utils/calendar/rangeDifferenceBetweenDays"
import { AmountRemaingTasks } from "./AmountRemaingTasks";
import { FaAngleUp } from "react-icons/fa6";
import { today } from "../../utils/calendar/rangeGridCalendar";

interface IDayProps {
    day: string;
    event?: (date:string) => void;
    items?: any;
    month?: number;
}

export const Day = ({ day, month, event, items }:IDayProps) => {

    const handleOpenTimeline = (item: any, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        // @ts-ignore
        openModal && openModal({
            // @ts-ignore
            content: <Edititem item={item} onClose={closeModal} />
        });
    };

    const handlePushitems = (items:any, date:string, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        let amountitems = [] as any;
        items.map(item => (item.hierarchy && item.hierarchy >= 4) && (item?.timeline?.includes(date)) && amountitems.push(item));
        // @ts-ignore
        openModal && openModal({
            content: <AmountRemaingTasks tasks={amountitems}/>
        });
    }

    return (
        <div 
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
                ${+day.split('-')[1] !== month ? "bg-light-300 dark:bg-dark-300" : "bg-light-200 dark:bg-dark-600 hover:bg-light-300 dark:hover:bg-dark-700"}
            `}
            onClick={() => event && event(day)}
        >
            <div className="absolute top-0 left-0 w-full h-full">
                {items?.map(item => item.timeline?.map((item, _i) => item == day ? (
                    <div
                    key={`${item}-${_i}`}
                    className={clsx(`absolute bg-${item.tag.dayor}-500 min-h-[16px] max-h-[16px] md:min-h-[18px] md:max-h-[18px] px-[5px] flex items-center font-semibold text-[.8em] md:text-[12px] rounded-md`, {
                        // position based on hierarchy of items
                        "top-0" : item.hierarchy === 1,
                        "top-[18px] md:top-[20px]" : item.hierarchy === 2,
                        "top-[36px] md:top-[40px]" : item.hierarchy === 3,
                        "hidden" : item.hierarchy && item.hierarchy >= 4
                    })}
                    style={{
                        width: `${(rangeDifferenceBetweenDates({initialDate:day, finalDate:item.end})) * 100}%`,
                        zIndex: _i == 0 ? 30 : 20
                    }}
                    onClick={(event) => handleOpenTimeline(item, event)}
                    >
                    {_i == 0 && (
                        <span className="text-dark-900">{item.title} - {item.days}d</span>
                    )}
                    </div>
                ) : null))}
            </div>
            {items?.map((item, key) => (
                item?.timeline?.includes(day) && (item?.hierarchy && item?.hierarchy >= 4) && (
                <div 
                    key={`${item}-${key}`}
                    className="absolute z-30 md:block hidden left-[5px] bottom-[5px] min-w-[10px] min-h-[10px] p-1 rounded-sm bg-light-400 text-dark-100 dark:bg-dark-400 hover:bg-purple-600 group"
                    onClick={event => handlePushitems(items, day, event)}
                ><FaAngleUp size={18} className="group-hover:text-light-100" />
                </div>
                )
            ))}
            <span className={`${today == day ? "!absolute w-[30px] h-[30px] bg-purple-500 font-semibold text-light-300" : "font-medium text-dark-600 dark:text-light-900"} relative z-30 grid place-items-center rounded-md text-xs`}>
                {+day.split("-")[2]}
            </span>
        </div>
    )
}