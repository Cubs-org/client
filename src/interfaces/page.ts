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
    value?: string;
    start?: string;
    end?: string;
} & Object;

export interface PagePropertiesProps {
    id: string;
    type: string;
    title: string;
    data: Data; 
    trash: boolean;
}