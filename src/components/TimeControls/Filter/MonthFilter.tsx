import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from "react-icons/fa"
import { Button } from "../../Button"
import { splitDt } from "../../../utils/datetime/splitDate";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getMonthByNumber } from "../../../utils/datetime/getMonthString";

interface IMonthFilter {
    date: Date;
    handles: {
        setDate: Dispatch<SetStateAction<Date>>;
        setYear: Dispatch<SetStateAction<number>>;
        setMonth: Dispatch<SetStateAction<number>>;
    }
}

export const MonthFilter = ({ date, handles }:IMonthFilter) => {

    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setMobile(true);
        } else {
            setMobile(false);
        }
    }, []);
    
    const handleChangeMonth = (to: string) => {
        const newDate = new Date(date); // Criar uma nova instância de data a partir da data existente
        const where = to === 'forward' ? (newDate.getMonth() + 1) : (newDate.getMonth() - 1);
    
        newDate.setMonth(where);
    
        handles.setDate(newDate);
        handles.setYear(splitDt(newDate)[0]);
        handles.setMonth(splitDt(newDate)[1]);
    }
    
    const handleChangeYear = (to: string) => {
        const newDate = new Date(date);
        const where = to === 'forward' ? (newDate.getFullYear() + 1) : (newDate.getFullYear() - 1);
    
        newDate.setFullYear(where);
    
        handles.setDate(newDate);
        handles.setYear(splitDt(newDate)[0]);
        handles.setMonth(splitDt(newDate)[1]);
    }
    

    return (
        <div className="w-full flex justify-between items-center gap-2 lg:gap-4 text-md lg:text-xl">
            <div className="flex items-center gap-1">
                <Button 
                    onClick={() => handleChangeYear('backward')} 
                ><FaAngleDoubleLeft />
                </Button>
                <Button
                    onClick={() => handleChangeMonth('backward')}
                ><FaAngleLeft />
                </Button>
            </div>

            <span 
                className="md:text-2xl text-md text-dark-600 dark:text-light-100 font-black"
            >{
                !mobile ? getMonthByNumber(date.getMonth()) : `${getMonthByNumber(date.getMonth()).substr(0, 3)}`
            }{!mobile ? " de " : ", "}{String(date.getFullYear())}</span>

            <div className="flex items-center gap-1">
                <Button
                    onClick={() => handleChangeMonth('forward')} 
                ><FaAngleRight />
                </Button>
                <Button
                    onClick={() => handleChangeYear('forward')} 
                ><FaAngleDoubleRight />
                </Button>
            </div>
        </div>
    )
}