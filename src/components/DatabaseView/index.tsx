import { Button } from "../Button";
import { CgBoard, CgMathPlus, CgSortAz, CgViewDay, CgViewGrid, CgViewList } from "react-icons/cg";

import clsx from "clsx";
import { Table } from "./Table";
import { IDatabaseViewProps } from "../../interfaces/datahub";
import { Skeleton } from "../Skeleton";
import { useState } from "react";
import { PageProps } from "../../interfaces/page";
import { Tooltip } from "../Tooltip";
import { SOCKET_URL } from "../../lib/api";
import { io } from "socket.io-client";
import { useUser } from "../../contexts/userContext";

type View = "Grade" | "Tabela" | "Kanban" | "Lista";

interface ViewProps {
    id?: number;
    name: View;
    icon: JSX.Element;
    preferences?: JSON;
}

const socket = io(SOCKET_URL);

export const DatabaseView = ({ 
    datahubId,
    title, 
    items, 
    handleSetItems,
    loading, 
    notDisplayTitle=false 
}: IDatabaseViewProps) => {

    const { user: {data: { email }} } = useUser();

    const [currentView, setCurrentView] = useState<View>("Tabela");

    function hasSelectionOnProps(items: PageProps[]) {
        return items[0]?.properties?.findIndex((prop) => prop.type === "selection") !== -1;
    }

    const views: ViewProps[] = [
        {
            name: "Grade",
            icon: <CgViewDay size={24} />
        },
        {
            name: "Tabela",
            icon: <CgViewGrid size={24} />
        },
        {
            name: "Lista",
            icon: <CgViewList size={24} />
        },
        {
            name: "Kanban",
            icon: <CgBoard size={24} />
        }
    ];

    const handleCreateNewPage = () => {
        socket.emit('createPage', {
            datahubId: datahubId,
            email: email
        });
    };

    return (
        <div className="w-full h-full relative">
            <div
                className={clsx("w-full flex justify-between mb-3",
                    // "sticky top-14 left-0 right-0 px-2 py-1 bg-glass-light backdrop-blur-md dark:bg-glass-dark ring-1 ring-light-500 dark:ring-dark-500 rounded-md"
                )}
            >

                <div className="flex gap-3 items-center">
                    {views.map((view, index) => (
                        <Tooltip 
                            key={index}
                            content={view.name}
                        >
                            <Button
                                classNames={clsx("w-max px-2 py-0.5 bg-light-200 text-dark-100 ring-1 ring-light-300 dark:text-light-300 dark:bg-dark-800 dark:ring-dark-600 hover:bg-light-300 dark:hover:bg-dark-700 transition-all ease-in", {
                                    "bg-light-400 dark:bg-dark-600": view.name === currentView,
                                    "hidden" : (!hasSelectionOnProps(items) && view.name === "Kanban")
                                })} 
                                onClick={() => setCurrentView(view.name)}
                            >
                                {view.icon}
                                {view.name === currentView && view.name}
                            </Button>
                        </Tooltip>
                    ))}
                </div>

                <div className="flex flex-row gap-2 items-center">
                    <Button classNames="px-2 py-1 bg-light-200 text-dark-100 ring-1 ring-light-300 dark:text-light-300 dark:bg-dark-800 dark:ring-dark-600 hover:bg-light-300 dark:hover:bg-dark-700">
                        <CgSortAz size={24} />
                        <span className="hidden md:block">Aplicar Filtros</span>
                    </Button>

                    <Button 
                        classNames="px-2 py-1"
                        onClick={handleCreateNewPage}
                    >
                        <CgMathPlus size={24} />
                        <span className="hidden md:block">Novo</span>
                    </Button>
                </div>
            </div>

            {(!notDisplayTitle && title) && <h1 className="text-xl font-bold mb-3">{title}</h1>}

            {!loading ?
                (currentView === "Tabela" && (
                    <Table.Body 
                        items={items} 
                        datahubId={datahubId}
                        handleSetItems={handleSetItems} 
                        handleCreateNewPage={handleCreateNewPage}
                    />
                ))
                : <Skeleton.Table />}
        </div>
    );
};