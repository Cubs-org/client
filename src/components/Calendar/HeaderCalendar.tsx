import { Dispatch, SetStateAction } from "react";

import { Button } from "../Button";
import { CreateTask } from "./CreateTask";
import { useModal } from "../../contexts/modalContext";
import {
    FaPlus,
} from "react-icons/fa";

import { DateFilter } from "../TimeControls/Filter/DateFilter";
import { FilterDropdown } from "../FilterDropdown";
import { useSearchParams } from "react-router-dom";
import { Popover } from "../Popover";
import { FaBullhorn, FaCalendarWeek, FaCircleCheck, FaFilter } from "react-icons/fa6";
import { NewItem } from "./NewItem";

interface IHeaderCalendar {
    year: number;
    month: number;
    date: Date;
    setYear: Dispatch<SetStateAction<number>>;
    setMonth: Dispatch<SetStateAction<number>>;
    setDate: Dispatch<SetStateAction<Date>>;
}

export const HeaderCalendar = ({date, setDate, setYear, setMonth}:IHeaderCalendar) => {

    const [searchParams] = useSearchParams();

    const filterBy = searchParams.get("filter");
    const view = searchParams.get("view");

    
    return (
        <div className="w-full flex gap-2 md:gap-0 justify-between items-center px-2 md:px-3 lg:px-0 py-2">

            <div className="w-fit flex gap-2 items-center justify-between md:justify-normal">
                
                <NewItem />

                <Popover
                    direction="right-start"
                    content={
                        <div className="flex flex-col gap-2 px-2 py-1">
                            <FilterDropdown
                                direction="right-start"
                                filterName="view"
                                items={["Mês", "Semana", "Dia"]}
                            />

                            <FilterDropdown
                                direction="right-start"
                                filterName="filterBy"
                                items={["Tarefas", "Eventos", "Lembretes", "Todos"]} 
                            />
                        </div>
                    }
                >
                    <span 
                        className="flex gap-1 items-center text-base font-semibold bg-purple-500 text-light-100 px-3 py-2 rounded-md"
                    >
                        <FaFilter />
                        <span className="hidden md:block">Filtros</span>
                    </span>
                </Popover>

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