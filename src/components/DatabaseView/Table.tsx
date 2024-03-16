import { useEffect } from "react";
import { Button } from "../Button"
import { renderPropertiesData, renderPropertiesTitle } from "../Page/renderProperties"
import { ColumnTable } from "./ColumnTable"
import { PageProps } from "../../interfaces/page";
import { SOCKET_URL } from "../../lib/api";
import { io } from "socket.io-client";

interface TableProps {
    items: PageProps[];
    handleSetItems: (data: PageProps[]) => void;
}

export const Table = ({ items, handleSetItems }:TableProps) => {

    const socket = io(SOCKET_URL);

    useEffect(() => {
        handleSetItems(items);
    }, [items]);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const targetColumnTitle = e.currentTarget.getAttribute("data-column-title");
        const targetColumnOrder = parseInt(e.currentTarget.getAttribute("data-column-order") || "0");

        const draggedColumnTitle = e.dataTransfer.getData("text/plain");
        const draggedColumnOrder = parseInt(e.dataTransfer.getData("text/number") || "0");

        if (targetColumnOrder === draggedColumnOrder) return;


        // Atualiza os items com as novas ordens
        const updatedItems = items.map((item:PageProps) => {
            if (!item.properties) return item;

            const updatedProperties = item.properties.map((property) => {
                if (property.title === targetColumnTitle) {
                    return {
                        ...property,
                        data: {
                            ...property.data,
                            loadOrder: draggedColumnOrder
                        }
                    }
                }
                if (property.title === draggedColumnTitle) {
                    return {
                        ...property,
                        data: {
                            ...property.data,
                            loadOrder: targetColumnOrder
                        }
                    }
                }
                return property;
            });

            return {
                ...item,
                properties: updatedProperties
            }
        });

        handleSetItems(updatedItems);

        socket.emit('moveColumn', {
            targetColumnTitle, targetColumnOrder,
            draggedColumnTitle, draggedColumnOrder
        });
    };

    return (
        <div className="w-full px-1 overflow-x-scroll scrollbar scrollbar-thumb-light-300 dark:scrollbar-thumb-dark-700 scrollbar-track-transparent">
            <div className="flex flex-row gap-1 float-left">
                <div className="flex flex-col items-center gap-1 flex-grow">
                    <table className="w-full rounded-md ring-1 ring-light-400 dark:ring-dark-700">
                        <thead className="w-full bg-light-300 dark:bg-dark-800 p-4 rounded-md">
                            <tr>
                                <ColumnTable 
                                    title="Título" 
                                    type="text"
                                />
                                {renderPropertiesTitle(items[0]?.properties ?? [], handleDrop) || null}
                            </tr>
                        </thead>
                        <tbody>
                            {items.sort((a, b) => {
                                const aDate = new Date(a.createdAt);
                                const bDate = new Date(b.createdAt);
                                return aDate.getTime() - bDate.getTime();
                            }).map((page, index) => {
                                // if (page.properties)
                                //     page.properties = page.properties.sort((a, b) => (b.data.loadOrder || 1) - (a.data.loadOrder || 2));
                                return (
                                    <tr key={index}>
                                        <td className="font-medium border border-light-400 dark:border-dark-700 px-3 py-1">
                                            <div className="flex items-center justify-between group">
                                                {page.title}
                                                <span
                                                    className="hidden group-hover:block bg-light-300 dark:bg-dark-700 rounded-md px-2 py-0.5 text-xs cursor-pointer"
                                                >Abrir</span>
                                            </div>
                                        </td>
                                        {renderPropertiesData(page)}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>

                    <Button classNames="w-full px-1 py-0.5 bg-transparent text-dark-600 dark:text-light-300 hover:bg-light-300 dark:hover:bg-dark-700">+</Button>
                </div>

                <Button classNames="bg-transparent text-dark-600 dark:text-light-300 hover:bg-light-300 dark:hover:bg-dark-700">+</Button>
            </div>
        </div>
    )
}