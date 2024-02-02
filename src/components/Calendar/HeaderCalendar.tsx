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

interface IHeaderCalendar {
    year: number;
    month: number;
    date: Date;
    setYear: Dispatch<SetStateAction<number>>;
    setMonth: Dispatch<SetStateAction<number>>;
    setDate: Dispatch<SetStateAction<Date>>;
}

export const HeaderCalendar = ({date, setDate, setYear, setMonth}:IHeaderCalendar) => {

    // @ts-ignore
    const { modalState:{ visible, content }, openModal, closeModal } = useModal();

    const handleCreateTask = () => {
        // @ts-ignore
        openModal && openModal({
            // @ts-ignore
            content: <CreateTask onClose={closeModal} />
        });
    }

    const [searchParams] = useSearchParams();

    const filter = searchParams.get("filter");
    
    return (
        <div className="w-full flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center px-3 md:px-3 lg:px-0 py-2">

            <div className="w-full md:w-fit flex gap-2 items-center justify-between md:justify-normal">
                <Button onClick={handleCreateTask} classNames="px-3">
                    <FaPlus size={14}/>
                    Novo item
                </Button>
                <FilterDropdown
                direction="right"
                    items={["month", "week", "day"]} 
                />

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