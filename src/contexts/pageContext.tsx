import { createContext, Dispatch } from "react";
import { PageData } from "../interfaces/page";
import { useContext, useState } from "react";

export interface PageContextProps {
    currentPage: PageData;
    branch: PageData[];
    members: PageMember[];
    setMembers: Dispatch<PageMember[]>;
    setBranch: Dispatch<PageData[]>;
    setPageData: (data: Partial<PageData>) => void;
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

    const setPageData = (data) => {
        setCurrentPage((prev) => {
            return {
                ...prev,
                ...data
            }
        });
    };

    return <PageContext.Provider value={{ currentPage, branch, members, setPageData, setBranch, setMembers }}>{children}</PageContext.Provider>
}

const usePage = () => {
    const context = useContext(PageContext);
    return context;
}

export { PageProvider, usePage };