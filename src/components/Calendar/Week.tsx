import { Day } from "./Day";

interface IWeek {
    week: string[];
    month?: number;
    event?: (date:string) => void;
    items?: any;
    isPage?: boolean;
    weekHeight?: {h:number, index:number}[];
    index?: number;
}

// type Height = string | number | undefined;

export const Week = ({ 
    week, 
    month, 
    items, 
    event, 
    isPage=false, 
    weekHeight, 
    index,
}: IWeek) => {
    
    let style = {};

    // if (isPage) {
    //     let height:Height;
    //     h = weekHeight?.find(week => week.index === index)?.h;
    //     height = h ? `${((h + 1)*40)}px` : "100px";
    //     style = { 
    //         minHeight: height,
    //         backgroundColor: height !== "100px" ? "#0f0" : "#f00"
    //     };
    // }


    // console.log(weekHeight);
    const hasItem = weekHeight?.find(week => week.index === index)?.h;

    if (isPage && !hasItem) {
        style = {
            minHeight: "100px",
            // backgroundColor: "#0f0"
        }
    }

    return (
        <div
            style={style}
            className="flex gap-[2px] flex-grow md:gap-[5px] place-items-center"
        >
            {week.map((day, _i) => (
                <Day
                    key={`${day}-${_i}`}
                    day={day}
                    month={month}
                    event={event}
                    items={items}
                    isPage={isPage}
                />
            ))}
        </div>
    );
};
