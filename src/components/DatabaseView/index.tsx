import { 
    useEffect, 
    useState 
} from "react";

import { FaPlus } from "react-icons/fa6";
import { PageProps } from "../../interfaces/page";
import { Button } from "../Button";
import { BsFilterRight } from "react-icons/bs";
import { CgBoard, CgViewDay, CgViewGrid } from "react-icons/cg";
import clsx from "clsx";
import { useSearchParams } from "react-router-dom";
import { randomUUID } from "crypto";
import { Table } from "./Table";

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

interface ViewProps {
    id?: number;
    name: string;
    icon: JSX.Element;
    preferences?: JSON;
}

export const DatabaseView = ({ data, notDisplayTitle = false }: IDatabaseViewProps) => {

    const views:ViewProps[] = [
        {
            name: "Grade",
            icon: <CgViewDay size={18} />
        },
        {
            name: "Tabela",
            icon: <CgViewGrid size={18} />
        },
        {
            name: "Kanban",
            icon: <CgBoard size={18} />
        }
    ];

    let tmp = views[1];

    const [availableView, setAvailableView] = useState<ViewProps[]>([{id:1,...tmp}]);

    const [searchParams, setSearchParams] = useSearchParams();

    const currentView = searchParams.get("view");

    const handleSetView = (view: string) => setSearchParams({ view });

    const handleAddView = () => {
        const newId = availableView.length + 1;
        setAvailableView([...availableView, {id:newId, ...views[1]}]);
    }

    return (
        <div className="w-full h-full relative">
            <div
                className={clsx("w-full flex justify-between mb-3",
                    // "sticky top-14 left-0 right-0 px-2 py-1 bg-glass-light backdrop-blur-md dark:bg-glass-dark ring-1 ring-light-500 dark:ring-dark-500 rounded-md"
                )}>
                    <div className="flex gap-2 items-center">

                        {availableView.map((view, index) => (
                            <span key={index} className={clsx("flex gap-1 items-center px-2 py-0.5 ring-1 ring-light-500 dark:ring-dark-100 rounded-md", {
                                "bg-light-300 dark:bg-dark-800 text-dark-100 dark:text-light-300": currentView === view.id?.toString(),
                                "hover:bg-light-300 dark:hover:bg-dark-300 cursor-pointer": currentView !== view.id?.toString()
                            })} 
                            onClick={() => {
                                if ( view.id)
                                    handleSetView(view.id.toString())
                            }}
                            >
                                {view.icon}
                                {view.name}
                            </span>
                        ))}

                        <Button 
                            classNames="ml-2 p-2 bg-transparent hover:bg-light-300 dark:hover:bg-dark-300 text-dark-100 dark:text-light-300"
                            onClick={handleAddView}
                        >
                            <FaPlus size={18} />
                        </Button>
                    </div>

                    <div className="flex flex-row gap-2 items-center">
                        <Button classNames="px-2 py-1 bg-light-200 text-dark-100 ring-1 ring-light-300 dark:text-light-300 dark:bg-dark-800 dark:ring-dark-600 hover:bg-light-300 dark:hover:bg-dark-700">
                            <BsFilterRight size={24} />
                            Aplicar Filtros
                        </Button>

                        <Button classNames="px-2 py-1">
                            <FaPlus size={18} />
                            Novo
                        </Button>
                    </div>
            </div>

            {(!notDisplayTitle && data && 'title' in data) && <h1 className="text-xl font-bold mb-3">{data.title}</h1>}

            <Table data={data} />
        </div>
    );
};