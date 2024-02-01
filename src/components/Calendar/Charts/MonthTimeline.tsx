import clsx from "clsx";
import rangeDifferenceBetweenDates from "../../../utils/calendar/rangeDifferenceBetweenDays";

interface ITimelineProps {
    item?: any;
    width?: number;
    index?: number;
    range?: number;
    hierarchy?: number;
}

export const Timeline = ({ item, width, index, range, hierarchy }:ITimelineProps) => {

    const handleOpenTimeline = (item: any, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();

        // @ts-ignore
        openModal && openModal({
            // @ts-ignore
            content: <Edititem item={item} onClose={closeModal} />
        });
    };

    const rangeDays = rangeDifferenceBetweenDates({initialDate:item.startDate, finalDate:item.endDate})

    return (
        <div 
            style={{ 
                width: item && width ? `calc(${width * 100}% + ${range && ((range * 5) - 5) + "px"})` : "100%",
            }}
            className={clsx("absolute z-10 left-0 min-w-full min-h-[10px] bg-secondary rounded-md shadow-none md:shadow-md flex items-center", {
                "top-0": (hierarchy === 1),
                "top-[calc((10px*1)+2px)]": (hierarchy === 2),
                "top-[calc((10px*2)+2px)]": (hierarchy === 3),
                // "!hidden": !onTop && (index !== 0),
                "!bg-red-500": item?.color === "red",
                "!bg-blue-500": item?.color === "blue",
                "!bg-green-500": item?.color === "green",
            })}
            onClick={(event) => handleOpenTimeline(item, event)}
        >
            {/* PageHeading */}
            {index === 0 && (
                <span 
                    className="text-xs font-medium text-black"
                >{item.title} @ {rangeDays}d</span>
            )}
        </div>
    )
}