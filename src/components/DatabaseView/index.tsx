import { FaPlus } from "react-icons/fa6";
import { PageProps } from "../../interfaces/page";
import { Button } from "../Button";
import { BsFilterRight } from "react-icons/bs";
import { CgBoard, CgViewDay, CgViewGrid } from "react-icons/cg";
import clsx from "clsx";

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

export const DatabaseView = ({ data, notDisplayTitle = false }: IDatabaseViewProps) => {

    const views = [
        {
            name: "Grid",
            icon: <CgViewDay size={18} />
        },
        {
            name: "Table",
            icon: <CgViewGrid size={18} />
        },
        {
            name: "Kanban",
            icon: <CgBoard size={18} />
        }
    ];

    return (
        <div className="w-full h-full relative">
            <div
                className={clsx("w-full flex justify-between",
                    // "sticky top-14 left-0 right-0 px-2 py-1 bg-glass-light backdrop-blur-md dark:bg-glass-dark ring-1 ring-light-500 dark:ring-dark-500 rounded-md"
                )}>
                    <div className="flex gap-2 items-center">

                        {views.map((view, index) => (
                            <span key={index} className="flex gap-1 items-center px-2 py-0.5 ring-1 ring-light-500 dark:ring-dark-100 rounded-md">
                                {view.icon}
                                {view.name}
                            </span>
                        ))}

                        <Button classNames="ml-2 p-2 bg-transparent hover:bg-light-300 dark:hover:bg-dark-300 text-dark-100 dark:text-light-300">
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

            {(!notDisplayTitle && data && 'title' in data) && <h1 className="text-xl font-bold my-2">{data.title}</h1>}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data && 'subdata' in data && data.subdata.map((page, index) => (
                    <div key={index} className="w-full bg-light-300 dark:bg-dark-800 p-4 rounded-md">
                        <h1 className="text-lg font-bold">{page.title}</h1>
                        <p className="text-sm text-dark-400 dark:text-light-700">Criado por {page.owner}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};