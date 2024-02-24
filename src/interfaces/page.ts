export interface PageProps {
    id: string;
    title: string;
    owner: string;
    createdAt: string;
    updatedAt: string;
    trash: boolean;

    properties?: PagePropertiesProps[];
}

export interface PagePropertiesProps {
    id: string;
    type: string;
    title: string;
    data: JSON;
    trash: boolean;
}