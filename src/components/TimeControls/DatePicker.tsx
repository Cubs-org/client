import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { formatToDateInput } from "../../utils/datetime/formatToDateInput";

interface IDatePicker extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, React.AriaAttributes {
    classNames?: string;
    showIcon?: boolean;
    handleChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
}

export const DatePicker = ({ classNames, showIcon=true, handleChange, value, ...props }: IDatePicker) => {

    const [date, setDate] = useState<string>(value || "");

    const picker = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(value !== undefined && value !== null) {
            setDate(value as string);
        }
    }, [value]);

    const handleShowDatePicker = () => {
        picker.current?.showPicker();
    }

    const formatDatetime = (datetime:string) => {
        const [date, time] = datetime.split("T");
        const [year, month, day] = date.split("-");
        const [hour, minute] = time.split(":");
        return `${day}/${month}/${year} às ${hour}:${minute}`;
    }

    return (
        <div className="relative flex flex-row-reverse justify-between items-center bg-light-300 dark:bg-dark-800 focus:outline-light-500 p-2 rounded-md focus:outline-2 dark:focus:outline-dark-300">
            <input 
                ref={picker}
                type="datetime-local"
                onChange={(e) => {
                    handleChange(e);
                    setDate(e.target.value)
                }}
                value={formatToDateInput(date)}
                name={props.name || "date"}
                className="absolute bg-transparent text-transparent w-full flex-1 h-full cursor-pointer"
                {...props}
            />

            <input 
                type="text" 
                value={date !== "" ? formatDatetime(date) : ""}
                placeholder="00/00/0000 às 00:00"
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
