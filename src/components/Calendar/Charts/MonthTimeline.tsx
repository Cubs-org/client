import clsx from "clsx";
import rangeDifferenceBetweenDates from "../../../utils/calendar/rangeDifferenceBetweenDays";

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

    const category = properties?.category;

    return (
        <div 
            style={{ 
                width: item && width ? `calc(${width * 100}% + ${range && ((range * 5) - 5) + "px"})` : "100%",
            }}
            className={clsx("absolute z-10 left-0 min-w-full min-h-[15px] bg-secondary rounded-md shadow-none md:shadow-md flex items-center px-2 transition-all duration-[.5s]", {
                "top-0": (hierarchy === 1),
                "top-[calc(15px+2px)]": (hierarchy === 2),
                "top-[calc(30px+4px)]": (hierarchy === 3),
                "hidden": (hierarchy >= 3),
                "max-h-[15px] truncate": (category.title === "task" || category.title === "reminder" || category.title === "event"),
                
                "bg-gray-500": !category,


                // added temporary to see the first item
                "!bg-red-500": category?.color === "red",
                "!bg-blue-500": category?.color === "blue",
                "!bg-green-500": category?.color === "green",
                "!bg-yellow-500": category?.color === "yellow",
            })}
            onClick={(event) => handle(item, event)}
        >
            {/* PageHeading */}
            <span 
                className="text-xs font-medium text-black"
            >{item.title} @ {rangeDays}d</span>
        </div>
    )
}