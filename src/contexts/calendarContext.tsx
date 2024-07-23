import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { PageProps } from "../interfaces/page";

type CalendarFilter = {
    start?: Date | string;
    end?: Date | string;
    owned?: boolean;
    pinned?: boolean;
    title: string;
    members: string[];
    status: "Completed" | "Pending" | "All";
};

type CalendarContextType = {
    pinned: PageProps[];
    setPinned: Dispatch<SetStateAction<PageProps[]>>;
    pages: PageProps[];
    setPages: Dispatch<SetStateAction<PageProps[]>>;
    filter: CalendarFilter;
    setFilter: Dispatch<SetStateAction<CalendarFilter>>;
};

interface CalendarProviderProps {
    children: React.ReactNode;
}

const CalendarContext = createContext<CalendarContextType | null>(null);

export const CalendarProvider = ({ children }: CalendarProviderProps) => {
    const [pinned, setPinned] = useState<PageProps[]>([]);
    const [pages, setPages] = useState<PageProps[]>([]);
    const [filter, setFilter] = useState<CalendarFilter>({
        title: "",
        members: [],
        status: "All",
    });

    const contextValue = {
        pinned,
        setPinned,
        pages,
        setPages,
        filter,
        setFilter,
    };

    return (
        <CalendarContext.Provider value={contextValue}>
            {children}
        </CalendarContext.Provider>
    );
}

export const useCalendar = () => {
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error("useCalendar must be used within a CalendarProvider");
    }
    return context;
}