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
import { FaBullhorn, FaCalendarWeek, FaCircleCheck } from "react-icons/fa6";

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
                <Popover 
                    direction="bottom-start"
                    content={
                        <div className="flex flex-col gap-1 p-1 min-w-[200px]">
                            <Button 
                                classNames="bg-transparent justify-start text-dark-300 dark:text-light-300 hover:text-light-300 hover:bg-purple-500" 
                                onClick={handleCreateTask}
                            >
                                <FaCircleCheck />
                                Tarefa
                            </Button>
                            
                            <hr className="mt-1 border-light-300 dark:border-dark-100"/>

                            <Button 
                                classNames="bg-transparent justify-start text-dark-600 dark:text-light-300 hover:text-light-300 hover:bg-purple-500"
                            >
                                <FaCalendarWeek />
                                Evento
                            </Button>
                            
                            <hr className="mt-1 border-light-300 dark:border-dark-100"/>

                            <Button 
                                classNames="bg-transparent justify-start text-dark-300 dark:text-light-300 hover:text-light-300 hover:bg-purple-500"
                            >
                                <FaBullhorn />
                                Lembrete
                            </Button>
                        </div>
                    }
                >
                    <span className="flex items-center gap-2 px-3 py-2 bg-primary text-light-200 text-base font-semibold rounded-md">
                        <FaPlus size={14}/>
                        Novo
                    </span>
                </Popover>

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