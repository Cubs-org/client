import { createContext, Dispatch, SetStateAction } from "react";
import { PageData } from "../types/page";
import { useContext, useState } from "react";

export interface PageContextProps {
    currentPage: PageData;
    branch: PageData[];
    members: PageMember[];
    setMembers: Dispatch<SetStateAction<PageMember[]>>;
    setBranch: Dispatch<SetStateAction<PageData[]>>;
    setPageData: (data: Partial<PageData>) => void;
    titleVisible: boolean;
    setTitleVisible: Dispatch<SetStateAction<boolean>>;
};

const PageContext = createContext<PageContextProps>({
    currentPage: {
        id: "",
        title: "",
        data: {
            icon: '',
            prev: undefined,
            next: undefined,
        }
    },
    branch: [],
    members: [],
} as unknown as PageContextProps);

const PageProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState<PageData>({
        id: "",
        title: "",
        data: {
            icon: "",
            prev: "",
            next: "",
        }
    });
    const [branch, setBranch] = useState<PageData[]>([]);
    const [members, setMembers] = useState<PageMember[]>([]);
    const [titleVisible, setTitleVisible] = useState<boolean>(true);

    const setPageData = (data) => {
        setCurrentPage((prev) => {
            return {
                ...prev,
                ...data
            }
        });
    };

    const contextValue = {
        currentPage,
        branch,
        members,
        setPageData,
        setBranch,
        setMembers,
        titleVisible,
        setTitleVisible
    }

    return <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
}

const usePage = () => {
    const context = useContext(PageContext);
    return context;
}

export { PageProvider, usePage };