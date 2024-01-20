import { Dispatch, SetStateAction } from "react";
import { MonthFilter } from "./MonthFilter"

interface IDateFilter {
    type: 'month' | 'week' | 'day';
    date: Date;
    handles: {
        setDate: Dispatch<SetStateAction<Date>>;
        setYear: Dispatch<SetStateAction<number>>;
        setMonth: Dispatch<SetStateAction<number>>;
    }
}

export const DateFilter = ({ date, handles }:IDateFilter) => {

    return (
        <MonthFilter date={date} handles={handles} />
    )
}