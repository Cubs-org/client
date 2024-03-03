import { PageProps } from "./page";

export interface IDatabaseViewProps {
    search: string;
    data: DatabaseView | [];
    view: "grid" | "list" | "table" | "kanban";
    notDisplayTitle?: boolean;
}

export interface DatabaseView {
    title: string;
    subdata: PageProps[] | [];
}