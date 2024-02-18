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

type Height = string | number | undefined;

export const Week = ({ week, month, items, event, isPage = false, weekHeight, index }: IWeek) => {
    
    let h:Height, style = {};

    if (isPage) {
        let height:Height;
        h = weekHeight?.find(week => week.index === index)?.h;
        height = h ? `${((h + 1)*40)}px` : "100px";
        style = { 
            minHeight: height,
            // backgroundColor: height !== "100px" ? "#0f0" : "#f00"
        };
    }

    /*
        Eu estava pensando aqui e me surgiu uma ideia 
        para resolver o problema do hierarchy para tasks 
        que tenham propriedades. A ideia é que se a task
        tiver hierarchy 1, top = 0, mas a partir do proximo, 
        a task receberá um valor `prevTptalProperties` que
        será a soma de todas as propriedades das tasks anteriores.
    */


    return (
        <div
            className="flex gap-[2px] flex-grow md:gap-[5px] place-items-center"
            style={style}
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
