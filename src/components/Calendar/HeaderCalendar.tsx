import { Dispatch, SetStateAction } from "react";

import { DateFilter } from "../TimeControls/Filter/DateFilter";
// import { useSearchParams } from "react-router-dom";
import { NewItem } from "./NewItem";
import { FilterVisualization } from "./FilterVisualization";

interface IHeaderCalendar {
    year: number;
    month: number;
    date: Date;
    setYear: Dispatch<SetStateAction<number>>;
    setMonth: Dispatch<SetStateAction<number>>;
    setDate: Dispatch<SetStateAction<Date>>;
    onNewItemCreated: (data: any) => void;
}

export const HeaderCalendar = ({date, setDate, setYear, setMonth, onNewItemCreated}:IHeaderCalendar) => {

    // const [searchParams] = useSearchParams();

    // const filterBy = searchParams.get("filter");
    // const view = searchParams.get("view");
    
    return (
        <div className="w-full flex gap-2 md:gap-0 justify-between items-center px-2 md:px-3 lg:px-0 py-2">

            <div className="w-fit flex gap-2 items-center justify-between md:justify-normal">
                
                <NewItem onNewItemCreated={onNewItemCreated} />

                <FilterVisualization />

                {/* ::{filter} */}
            </div>

            <div className="w-full md:w-[500px]">
                <DateFilter 
                    type="month" 
                    date={date} 
                    handles={{ setDate, setYear, setMonth }}
                />
            </div>
        </div>
    );
}