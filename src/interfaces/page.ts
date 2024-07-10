export interface PageProps {
    id: string;
    title: string;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
    trash: boolean;

    properties?: PagePropertiesProps[];
}

type Data = {
    // default
    value?: string | number | boolean | string[];

    icon?: string;
    width?: number;
    loadOrder?: number;

    // datetime
    start?: string;
    end?: string;

    // select | multiselect
    items?: { name: string; color: string }[];
    tags?: { name: string; color: string }[];
} & Object;

export interface PagePropertiesProps {
    id: string;
    type: string;
    title: string;
    data: Data;
    trash: boolean;
}

export type PageData = {
    id: string;
    title: string;
    data: {
        icon: string;
        prev?: string | undefined | null;
        next?: string | undefined | null;
    }
}

export type ChangeAction = {
    type: "title" | "icon";
    payload: string;
}

export type ToolData = {
    x?: number;
    y: number;
    width?: number;
    align?: 'left' | 'right' | 'center';
};

export type DataTools = {
    type: string;
    tool_id: string;
    data: ToolData;
    content?: any;
    url?: string;
};