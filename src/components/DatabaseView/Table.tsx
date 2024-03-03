import { useEffect, useState } from "react";
import { Button } from "../Button"
import { renderPropertiesData, renderPropertiesTitle } from "../Page/renderProperties"
import { ColumnTable } from "./ColumnTable"
import { PageProps } from "../../interfaces/page";
import { SOCKET_URL } from "../../lib/api";
import { io } from "socket.io-client";

export const Table = ({ data }) => {

    const socket = io(SOCKET_URL);

    const [items, setItems] = useState<PageProps[]>(data.subdata);

    useEffect(() => {
        // socket.on('items', (data) => {
        //     setItems(data);
        // });

        setItems(data.subdata);
    }, [data]);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const targetColumnId = e.currentTarget.getAttribute("data-column-id");
        const targetColumnOrder = parseInt(e.currentTarget.getAttribute("data-column-order") || "0");

        const draggedColumnId = e.dataTransfer.getData("text/plain");
        const draggedColumnOrder = parseInt(e.dataTransfer.getData("text/number") || "0");

        if (targetColumnId === draggedColumnId) return;

        socket.emit('moveColumn', {
            targetColumnId, targetColumnOrder,
            draggedColumnId, draggedColumnOrder
        });

        socket.on('columnMoved', (data) => {
            
            const newItems = items.map((item) => {
                if (item.id === data.pageId) {
                    const newProperties = item.properties?.map((property) => {
                        if (property.id === data.id) {
                            return {
                                ...property,
                                data: data.data
                            }
                        }
                        return property;
                    });

                    return {
                        ...item,
                        properties: newProperties
                    }
                }
                return item;
            });

            setItems(newItems);
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
                                {renderPropertiesTitle(items[0]?.properties ?? [], handleDrop)}
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((page, index) => (
                                <tr key={index}>
                                    <td className="border border-light-400 dark:border-dark-700 px-3 py-1">{page.title}</td>
                                    {renderPropertiesData(page)}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Button classNames="w-full px-1 py-0.5 bg-transparent text-dark-600 dark:text-light-300 hover:bg-light-300 dark:hover:bg-dark-700">+</Button>
                </div>

                <Button classNames="bg-transparent text-dark-600 dark:text-light-300 hover:bg-light-300 dark:hover:bg-dark-700">+</Button>
            </div>
        </div>
    )
}