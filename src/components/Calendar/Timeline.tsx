import clsx from "clsx";
import rangeDifferenceBetweenDates from "../../utils/calendar/rangeDifferenceBetweenDays";

interface ITimelineProps {
    item?: any;
    width?: number;
    onTop?: boolean;
    index?: number;
    range?: number;
}

export const Timeline = ({ item, width, onTop, index, range }:ITimelineProps) => {

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
                zIndex: (onTop || index === 0) ? 30 : 0
            }}
            className={clsx("absolute top-0 left-0 min-w-full py-[.2em] px-[.2em] md:px-3 md:py-0 bg-secondary rounded-md shadow-none md:shadow-md flex items-center")}
            onClick={(event) => handleOpenTimeline(item, event)}
        >
            {/* PageHeading */}
            <span 
                className="text-sm font-medium text-black"
            >{item.title} / {rangeDays}d / {range}</span>
        </div>
    )
}