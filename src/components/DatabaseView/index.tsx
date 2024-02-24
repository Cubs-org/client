import { PageProps } from "../../interfaces/page";

interface IDatabaseViewProps {
    search: string;
    data: DatabaseView | [];
    view: "grid" | "list" | "table" | "kanban";
    notDisplayTitle?: boolean;
}

interface DatabaseView {
    title: string;
    subdata: PageProps[];
}

export const DatabaseView = ({ data, notDisplayTitle=false }:IDatabaseViewProps) => {
    return (
        <div className="w-full">
            {(!notDisplayTitle && data && 'title' in data) && <h1 className="text-xl font-bold mb-2">{data.title}</h1>}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data && 'subdata' in data && data.subdata.map((page, index) => (
                    <div key={index} className="w-full bg-light-100 dark:bg-dark-800 p-4 rounded-md">
                        <h1 className="text-lg font-bold">{page.title}</h1>
                        <p className="text-sm text-dark-300 dark:text-light-500">{page.owner}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};