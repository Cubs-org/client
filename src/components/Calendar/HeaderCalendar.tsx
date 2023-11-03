import { Dispatch, SetStateAction } from "react";

import { Button } from "../Button";
import { CreateTask } from "./CreateTask";
import { IModal } from "../../interfaces/modal";
import { useModal } from "../../contexts/modalContext";
import { 
    FaAngleLeft,
    FaAngleRight,
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
    FaPlus,
} from "react-icons/fa";

interface IHeaderCalendar {
    year: number;
    month: number;
    date: Date;
    setYear: Dispatch<SetStateAction<number>>;
    setMonth: Dispatch<SetStateAction<number>>;
    setDate: Dispatch<SetStateAction<Date>>;
    splitDt: (Date) => void;
}

export const HeaderCalendar = ({year, date, setDate, setYear, setMonth, splitDt}:IHeaderCalendar) => {
    const getMonthString = (month:number) => {
        return new Date(year, month, 0).toLocaleString('pt-br', {month: 'long'});
    }

    const backwardMonth = () => {
      let dt = date;
      dt.setMonth(date.getMonth() - 1);
      setDate(dt);
      setYear(splitDt(date)[0]);
      setMonth(splitDt(date)[1]);
    }
    
    const forwardMonth = () => {
      let dt = date;
      dt.setMonth(date.getMonth() + 1);
      setDate(dt);
      setYear(splitDt(date)[0]);
      setMonth(splitDt(date)[1]);
    }

    const backwardYear = () => {
      let dt = date;
      dt.setFullYear(date.getFullYear() - 1);
      setDate(dt);
      setYear(splitDt(date)[0]);
      setMonth(splitDt(date)[1]);
    }
    
    const forwardYear = () => {
      let dt = date;
      dt.setFullYear(date.getFullYear() + 1);
      setDate(dt);
      setYear(splitDt(date)[0]);
      setMonth(splitDt(date)[1]);
    }

    // // @ts-ignore
    // const { 
    //     modalState: {
    //         content 
    //     }, 
    //     openModal, 
    //     closeModal 
    // }:IModal = useModal();

    const handleCreateTask = () => {
        // @ts-ignore
        openModal && openModal({
            // @ts-ignore
            content: <CreateTask onClose={closeModal} />
        });
    }
    
    return (
        <div className="w-[90%] md:w-full m-auto flex justify-center md:justify-between items-center py-3">
            <div className="hidden md:block md:w-1/2">
                <Button onClick={handleCreateTask}>
                    <FaPlus size={16}/>
                    Criar nova tarefa
                </Button>
            </div>
            <div className="w-full md:w-1/2 flex justify-between items-center gap-6">
                <div className="flex items-center gap-1">
                    <Button 
                        onClick={backwardYear} 
                    ><FaAngleDoubleLeft size={24} />
                    </Button>
                    <Button
                        onClick={backwardMonth}
                    ><FaAngleLeft size={24} />
                    </Button>
                </div>
                <h1 
                    className="md:text-2xl text-md text-dark-600 dark:text-light-100 font-black"
                >{getMonthString(splitDt(date)[1])} de {year}</h1>
                <div className="flex items-center gap-1">
                    <Button
                        onClick={forwardMonth} 
                    ><FaAngleRight size={24} />
                    </Button>
                    <Button
                        onClick={forwardYear} 
                    ><FaAngleDoubleRight size={24} />
                    </Button>
                </div>
            </div>
        </div>
    );
}