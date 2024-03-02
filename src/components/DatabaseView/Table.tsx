import { useState } from "react";
import { Button } from "../Button"
import { renderPropertiesData, renderPropertiesTitle } from "../Page/renderProperties"
import { ColumnTable } from "./ColumnTable"
import { PageProps } from "../../interfaces/page";

export const Table = ({ data }) => {

    const [items, setItems] = useState(data.subdata);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        const targetColumnId = e.currentTarget.getAttribute("data-column-id");
        const targetColumnOrder = parseInt(e.currentTarget.getAttribute("data-column-order") || "0");

        const draggedColumnId = e.dataTransfer.getData("text/plain");
        const draggedColumnOrder = parseInt(e.dataTransfer.getData("text/number") || "0");


        console.log(targetColumnId, targetColumnOrder);
        console.log(draggedColumnId, draggedColumnOrder);

        // // Se a ordem dos itens for a mesma, não faz nada
        if (targetColumnId === draggedColumnId) return;

        // // Atualiza os items com as novas ordens
        const updatedItems = items.map((item:PageProps) => {
            if (!item.properties) return item;

            const updatedProperties = item.properties.map((property) => {
                if (property.id === targetColumnId) {
                    return {
                        ...property,
                        data: {
                            ...property.data,
                            loadOrder: draggedColumnOrder
                        }
                    }
                }
                if (property.id === draggedColumnId) {
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

        console.log(items);

        // Atualiza o estado com os novos items
        setItems(updatedItems);
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
                                {renderPropertiesTitle(items[0].properties, handleDrop)}
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