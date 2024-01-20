import { Dispatch, SetStateAction, useState } from "react";

import { Button } from "../Button";
import { CreateTask } from "./CreateTask";
import { useModal } from "../../contexts/modalContext";
import {
    FaPlus,
} from "react-icons/fa";

import { DateFilter } from "../TimeControls/Filter/DateFilter";
import { Dropdown } from "../Dropdown";

interface IHeaderCalendar {
    year: number;
    month: number;
    date: Date;
    setYear: Dispatch<SetStateAction<number>>;
    setMonth: Dispatch<SetStateAction<number>>;
    setDate: Dispatch<SetStateAction<Date>>;
}

export const HeaderCalendar = ({date, setDate, setYear, setMonth}:IHeaderCalendar) => {

    const [visual, setVisual] = useState<'month' | 'week' | 'day'>('month'); // ['month', 'week', 'day'

    // @ts-ignore
    const { modalState:{ visible, content }, openModal, closeModal } = useModal();

    const handleCreateTask = () => {
        // @ts-ignore
        openModal && openModal({
            // @ts-ignore
            content: <CreateTask onClose={closeModal} />
        });
    }
    
    return (
        <div className="w-[90%] md:w-full m-auto flex justify-between items-center py-3">

            <div className="flex gap-2 items-center">
                <Button onClick={handleCreateTask} classNames="px-3 hidden md:flex">
                    <FaPlus size={14}/>
                    Novo item
                </Button>
                <Dropdown 
                    name="calendar-view"
                    className="px-3 py-2 bg-transparent text-dark-100 rounded-md flex items-center gap-1 text-base font-medium outline-none ring-2 ring-light-400"
                    items={[
                        {
                            name: 'Mês',
                            onClick: () => setVisual('month')
                        },
                        {
                            name: 'Semana',
                            onClick: () => setVisual('week')
                        },
                        {
                            name: 'Dia',
                            onClick: () => setVisual('day')
                        }
                    ]} 
                />
            </div>

            <div className="w-1/3">
                <DateFilter 
                    type="month" 
                    date={date} 
                    handles={{ setDate, setYear, setMonth }} 
                />
            </div>
        </div>
    );
}