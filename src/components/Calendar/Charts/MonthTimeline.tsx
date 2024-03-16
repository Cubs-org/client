import clsx from "clsx";
import rangeDifferenceBetweenDates from "../../../utils/calendar/rangeDifferenceBetweenDays";
import { CSSProperties } from "react";

interface ITimelineProps {
    item?: any;
    width?: number;
    range?: number;
    hierarchy: number;
    handle: (item: any, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onItemDeleted?: (item: any) => void;
}

export const Timeline = ({ item, width, range, hierarchy, handle }:ITimelineProps) => {

    const properties = item?.properties;

    const datetimeProperty = properties.find((p: any) => p.type === "datetime").data,
        start = datetimeProperty.start,
        end = datetimeProperty.end;

    const rangeDays = rangeDifferenceBetweenDates({
        initialDate: start.split(" ")[0], 
        finalDate: end.split(" ")[0]
    });

    const timelineProps = properties?.find((p: any) => p.type === "calendar");
    const isFiltered = (["task", "event", "reminder"].includes(timelineProps?.title));
    const isCompleted = item?.properties?.find((p: any) => p.type === "checkbox")?.data?.value;

    let style:CSSProperties = {
        width: item && width ? `calc(${width * 100}% + ${range && ((range * 5) - 5) + "px"})` : "100%",
    };

    return (
        <div 
            style={style}
            className={clsx("absolute z-10 left-0 min-w-full min-h-[15px] rounded-md shadow-none md:shadow-md text-black flex items-center px-2 transition-all duration-[.5s]", {
                "top-0": (hierarchy === 1),
                "top-[calc(15px+2px)]": (hierarchy === 2),
                "top-[calc(30px+4px)]": (hierarchy === 3),
                "hidden": (hierarchy >= 3),

                "max-h-[15px] truncate": isFiltered,
                
                "px-2 py-3 !shadow-none": !isFiltered,

                "line-through" : isCompleted,

                // added temporary to see the first item
                "!bg-red-500": timelineProps?.data?.color === "red",
                "!bg-blue-500": timelineProps?.data?.color === "blue",
                "!bg-green-500": timelineProps?.data?.color === "green",
                "!bg-yellow-500": timelineProps?.data?.color === "yellow",
                "!bg-pink-500": timelineProps?.data?.color === "pink",
                "!bg-orange-500": timelineProps?.data?.color === "orange",
                "!bg-purple-500": timelineProps?.data?.color === "purple",
                "!bg-indigo-500": timelineProps?.data?.color === "indigo",
            })}
            onClick={(event) => handle(item, event)}
        >
            {/* PageHeading */}
            {isFiltered && <span 
                className={clsx("text-xs font-medium", {
                    "dark:text-light-300 !text-sm": !isFiltered,
                })}
            >{item.title || "Sem título"} @ {Math.round(rangeDays)}d</span>}
        </div>
    )
}