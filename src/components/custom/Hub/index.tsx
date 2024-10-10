import { Button } from "../../Button";
import { CgBoard, CgMathPlus, CgSortAz, CgViewDay, CgViewGrid, CgViewList } from "react-icons/cg";

import clsx from "clsx";
import { Table } from "./Table";
import { HubView, IHubProps } from "../../../types/hub";
import { Skeleton } from "../Skeleton";
import { useEffect } from "react";
import { PageProps } from "../../../types/page";
import { Tooltip } from "../../Tooltip";
import { useUser } from "../../../contexts/userContext";
import { useSocket } from "../../../contexts/socketContext";
import { useHub } from "../../../contexts/hubContext";

/** Define if Hub has selection properties to display Kanban viewMode */
function hasSelectionOnProps(items: PageProps[]) {
    return items[0]?.properties?.findIndex((prop) => prop.type === "selection") !== -1;
}

const views = [
    {
        name: "grid",
        icon: <CgViewDay size={24} />
    },
    {
        name: "table",
        icon: <CgViewGrid size={24} />
    },
    {
        name: "list",
        icon: <CgViewList size={24} />
    },
    {
        name: "kanban",
        icon: <CgBoard size={24} />
    }
];

export const Hub = ({
    hubId,
    title,
    loading,
    notDisplayTitle = false
}: IHubProps) => {

    const { user: { data: { email } } } = useUser();

    const { pages, setPages, settings: { viewPreferences }, setSettings } = useHub();

    const {
        listener,
    } = useSocket();

    /**
     * Change the view of the hub
    */
    const handleChangeView = (view: HubView) => {
        setSettings(prev => ({
            ...prev,
            viewPreferences: view
        }));
    };

    const updatedPages = ({ pages, error }) => {
        if (error) {
            console.error(error);
            return;
        }

        setPages(pages);
    };

    /**
     * Create a new page on the current hub
     */
    const handleCreateNewPage = () => {
        if (!listener) return;

        listener.emit('request:createHubPage', {
            datahubId: hubId,
            email: email
        });
    };

    /**
     * Preload the pages from the hub when the component is mounted
     */
    useEffect(() => {
        if (!listener) return;

        listener.emit('request:getPagesFromHub', { hubId });

        // Join the room of the hub
        listener.emit('joinRoom', hubId);
    }, []);

    useEffect(() => {
        if (!listener) return;

        listener.on('response:getPagesFromHub', updatedPages);

        listener.on('response:createHubPage', ({ page, error }) => {
            if (error) {
                console.error(error);
                return;
            }
    
            setPages(prevPages => [...prevPages, page]);
        });

        return () => {
            listener.off('response:getPagesFromHub', updatedPages);
            listener.off('response:createHubPage');
        };
    }, [pages, listener]);

    return (
        <div className="w-full h-full relative" key={`hub-${JSON.stringify(pages)}`}>
            <div
                className={clsx("w-full flex justify-between mb-3",
                    // "sticky top-14 left-0 right-0 px-2 py-1 bg-glass-light backdrop-blur-md dark:bg-glass-dark ring-1 ring-light-500 dark:ring-dark-500 rounded-md"
                )}>
                <div className="flex gap-3 items-center">
                    {views.map((view, index) => (
                        <Tooltip
                            key={index}
                            content={view.name}
                        >
                            <Button
                                classNames={clsx("w-max px-2 py-0.5 bg-light-200 text-dark-100 ring-1 ring-light-300 dark:text-light-300 dark:bg-dark-800 dark:ring-dark-600 hover:bg-light-300 dark:hover:bg-dark-700 transition-all ease-in", {
                                    "bg-light-400 dark:bg-dark-600": view.name === viewPreferences,
                                    "hidden": (!hasSelectionOnProps(pages) && view.name === "kanban")
                                })}
                                onClick={() => handleChangeView(view.name as HubView)}
                            >
                                {view.icon}
                                {view.name === viewPreferences && view.name}
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
                (viewPreferences === "table" && (
                    <Table.Body onCreate={handleCreateNewPage}/>
                ))
                : <Skeleton.Table />}
        </div>
    );
};