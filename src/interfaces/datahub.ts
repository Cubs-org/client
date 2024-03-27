import { PageProps } from "./page";

export interface IDatabaseViewProps {
    title: string;
    search: string;
    items: PageProps[];
    view: "grid" | "list" | "table" | "kanban";
    handleSetItems: (data: PageProps[]) => void;
    notDisplayTitle?: boolean;
    loading?: boolean;
    datahubId: string;
}