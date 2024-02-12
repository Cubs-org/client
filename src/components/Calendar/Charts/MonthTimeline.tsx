import clsx from "clsx";
import rangeDifferenceBetweenDates from "../../../utils/calendar/rangeDifferenceBetweenDays";
import { TimelineProperties } from "./TimelineProperties";

interface ITimelineProps {
    item?: any;
    width?: number;
    range?: number;
    hierarchy: number;
    handle: (item: any, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const Timeline = ({ item, width, range, hierarchy, handle }:ITimelineProps) => {

    const properties = item?.properties;

    const rangeDays = rangeDifferenceBetweenDates({
        initialDate: properties.date.start, 
        finalDate: properties.date.end
    });

    const category = properties?.itemType;
    const isFiltered = (["task", "event", "reminder"].includes(category?.title));

    return (
        <div 
            style={{ 
                width: item && width ? `calc(${width * 100}% + ${range && ((range * 5) - 5) + "px"})` : "100%",
            }}
            className={clsx("absolute z-10 left-0 min-w-full min-h-[15px] rounded-md shadow-none md:shadow-md text-black flex items-center px-2 transition-all duration-[.5s]", {
                "top-0": (hierarchy === 1),
                "top-[calc(15px+2px)]": (hierarchy === 2),
                "top-[calc(30px+4px)]": (hierarchy === 3),
                "hidden": (hierarchy >= 3),
                "max-h-[15px] truncate": isFiltered,
                
                "px-2 py-3 !shadow-none": !isFiltered,


                // added temporary to see the first item
                "!bg-red-500": category?.color === "red",
                "!bg-blue-500": category?.color === "blue",
                "!bg-green-500": category?.color === "green",
                "!bg-yellow-500": category?.color === "yellow",
            })}
            onClick={(event) => handle(item, event)}
        >
            {/* PageHeading */}
            {isFiltered ? <span 
                className={clsx("text-xs font-medium", {
                    "dark:text-light-300 !text-sm": !isFiltered,
                })}
            >{item.title} @ {rangeDays}d</span> : (
                <TimelineProperties item={item} />
            )}
        </div>
    )
}