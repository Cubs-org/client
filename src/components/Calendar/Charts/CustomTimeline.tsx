import rangeDifferenceBetweenDates from "../../../utils/calendar/rangeDifferenceBetweenDays";
import { TimelineProperties } from "./TimelineProperties";
import { CSSProperties } from "react";

interface ITimelineProps {
    item?: any;
    handle: (item: any, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    isFirst: boolean;
}

export const CustomTimeline = ({ item, isFirst, handle }:ITimelineProps) => {

    const properties = item?.properties;

    const datetimeProperty = properties.find((p: any) => p.type === "datetime").data,
        start = datetimeProperty.start,
        end = datetimeProperty.end;

    const rangeDays = rangeDifferenceBetweenDates({
        initialDate: start.split(" ")[0], 
        finalDate: end.split(" ")[0]
    }) - 1;

    // const timelineProps = properties?.find((p: any) => p.type === "calendar");

    let style:CSSProperties = {
        width: (item && rangeDays && isFirst) ? `calc(${rangeDays * 100}% + ${((rangeDays-1)*5) + ((rangeDays-1)*16)}px)` : "100%",
        zIndex: isFirst ? 30 : 0,
        opacity: isFirst ? 1 : 0,
    };

    return (
        <div 
            // style={style}
            className={"min-w-full min-h-[15px] rounded-md text-black flex items-center transition-all duration-[.5s]"}
            onClick={(event) => handle(item, event)}
        >
            

            <div className="relative">
                <span className="opacity-0"><TimelineProperties item={item} /></span>

                <div style={style} className="absolute min-h-full flex flex-1 top-0 left-0 rounded-md">
                    <TimelineProperties item={item} />
                </div>
            </div>
        </div>
    )
}