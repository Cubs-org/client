import clsx from "clsx";
import { Dispatch, SetStateAction, useRef } from "react";
import { FaCalendar } from "react-icons/fa";

interface IDatePicker {
    value: string;
    handleSetValue: Dispatch<SetStateAction<string>>;
}

export const DatePicker = ({value, handleSetValue}:IDatePicker) => {
    const picker = useRef<HTMLInputElement>(null);
    
    const handleShowDatePicker = () => {
        picker.current?.showPicker();
    }

    const formatDate = (date:string) => {
        let dt:any = date.split("-");
        dt = `${dt[2]}/${dt[1]}/${dt[0]}`;

        return dt;
    }

    return (
        <div className="relative flex flex-row-reverse items-center bg-light-300 dark:bg-dark-600 focus:outline-light-500 p-2 rounded-md focus:outline-2 dark:focus:outline-dark-300">
            <input 
                ref={picker}
                type="date"
                value={value}
                onChange={e => handleSetValue(e.target.value)}
                className="absolute bg-transparent text-transparent"
            />

            <input 
                type="text" 
                defaultValue={
                    value != '' ? formatDate(value) : value
                }
                placeholder="00/00/0000"
                className={
                    clsx("relative w-[10ch] bg-light-300 dark:bg-dark-600 placeholder-light-900 dark:placeholder-dark-100 font-bold outline-none", {
                    "text-dark-400 dark:text-light-300" : value !== "",
                    "text-dark-300 dark:text-dark-100" : value === ""
                })}
            />
            <button 
                onClick={handleShowDatePicker}
                className="text-dark-100 dark:text-light-300 mr-4 relative"
            ><FaCalendar size={16}/></button>
        </div>
    );
}