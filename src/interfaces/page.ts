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
    value?: string | number | boolean | string[];
    start?: string;
    end?: string;
    items?: {name:string;color:string}[];
    tags?: {name:string;color:string}[];
} & Object;

export interface PagePropertiesProps {
    id: string;
    type: string;
    title: string;
    data: Data; 
    trash: boolean;
}