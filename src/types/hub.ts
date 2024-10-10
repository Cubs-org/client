export type HubView = "grid" | "list" | "table" | "kanban";

export interface IHubProps {
    title: string;
    search: string;
    view: HubView;
    notDisplayTitle?: boolean;
    loading?: boolean;
    hubId: string;
}