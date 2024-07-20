import { createContext, Dispatch, SetStateAction } from "react";
import { PageProps } from "../interfaces/page";
import { useContext, useState } from "react";
import { HubView } from "../interfaces/hub";

type HubSettingsProps = {
    order?: {
        kanban: string[];
        table: string[];
        list: string[];
    };
    viewPreferences?: HubView;
    filter?: {
        search?: string;
        tags?: string[];
    };
};

export interface HubContextProps {
    pages: PageProps[];
    setPages: Dispatch<SetStateAction<PageProps[]>>;
    settings: HubSettingsProps;
    setSettings: Dispatch<SetStateAction<HubSettingsProps>>;
};

const HubContext = createContext<HubContextProps>({
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
} as unknown as HubContextProps);

const HubProvider = ({ children }) => {
    const [pages, setPages] = useState<PageProps[]>([
        {
            id: "$pag1",
            title: "Teste de página 1",
            createdAt: `${new Date()}`,
            updatedAt: `${new Date()}`,
            ownerId: "",
            trash: false,
            properties: [],
        }
    ]);
    const [settings, setSettings] = useState<HubSettingsProps>({
        viewPreferences: "table",
    })

    const value = {
        pages, 
        setPages,
        settings,
        setSettings
    };

    return (
        <HubContext.Provider value={value}>
            {children}
        </HubContext.Provider>
    )
}

const useHub = () => {
    const context = useContext(HubContext);
    return context;
}

export { HubProvider, useHub };