import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { FaCalendar } from "react-icons/fa";

interface IDatePicker extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, React.AriaAttributes {
    classNames?: string;
    showIcon?: boolean;
    handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    handleValue?: (value:string) => void;
}

export const DatePicker = ({ classNames, showIcon=true, handleChange, ...props }:IDatePicker) => {

    const [date, setDate] = useState<string>("0000-00-00" || props.value as string);
    
    const picker = useRef<HTMLInputElement>(null);
    
    const handleShowDatePicker = () => {
        picker.current?.showPicker();
    }

    const formatDate = (date:string) => {
        let dt:any = date.split("-");
        dt = `${dt[2]}/${dt[1]}/${dt[0]}`;

        return dt;
    }

    useEffect(() => {
        if(props.value) {
            setDate(props.value as string);
        }
    }, [props.value]);

    return (
        <div className="relative flex flex-row-reverse justify-between items-center bg-light-300 dark:bg-dark-800 focus:outline-light-500 p-2 rounded-md focus:outline-2 dark:focus:outline-dark-300">
            <input 
                ref={picker}
                type="date"
                onChange={(e) => {
                    handleChange(e);
                    setDate(e.target.value)
                }}
                onBlur={(e) => setDate(e.target.value)}
                name={props.name || "date"}
                className="absolute bg-transparent text-transparent w-full flex-1 h-full cursor-pointer"
                {...props}
            />

            <input 
                type="text" 
                value={formatDate(date)}
                placeholder="00/00/0000"
                className={
                    clsx("relative flex-1 w-[10ch] bg-light-300 dark:bg-dark-800 placeholder-light-900 dark:placeholder-dark-100 font-bold outline-none", {
                    "text-dark-400 dark:text-light-300" : date !== "",
                    "text-dark-300 dark:text-dark-100" : date === ""
                })}
                readOnly
            />

            <span 
                onMouseDown={(e) => {
                    e.preventDefault(); // Evita que o botão obtenha o foco
                    handleShowDatePicker();
                }}
                className={clsx("text-dark-100 dark:text-light-300 mr-4 relative", {
                    "hidden": !showIcon,
                    "flex": showIcon
                })}
            >
                <FaCalendar size={16}/>
            </span>
        </div>
    );
}