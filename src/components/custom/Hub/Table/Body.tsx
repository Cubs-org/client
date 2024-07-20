import { Button } from "../../../Button";
import { renderPropertiesData, renderPropertiesTitle } from "../../Page/renderProperties";
import { Title } from "./Cell/Title";
import { NewColumn } from "./BtnNewColumn";
import { Popover } from "../../../Popover";
import { ColumnTable } from "../ColumnTable";
import { Link } from "react-router-dom";
import { useHub } from "../../../../contexts/hubContext";

interface BodyProps {
    onCreate: () => void;
};

export const Body = ({ onCreate }: BodyProps) => {

    const { pages } = useHub();

    // const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    //     e.preventDefault();

    //     const targetColumnTitle = e.currentTarget.getAttribute("data-column-title");
    //     const targetColumnOrder = parseInt(e.currentTarget.getAttribute("data-column-order") || "0");

    //     const draggedColumnTitle = e.dataTransfer.getData("text/plain");
    //     const draggedColumnOrder = parseInt(e.dataTransfer.getData("text/number") || "0");

    //     if (targetColumnOrder === draggedColumnOrder) return;


    //     /** 
    //      * Atualiza a ordem das colunas
    //      */
    //     const updatedItems = pages.map((item:PageProps) => {
    //         if (!item.properties) return item;

    //         const updatedProperties = item.properties.map((property) => {
    //             if (property.title === targetColumnTitle) {
    //                 return {
    //                     ...property,
    //                     data: {
    //                         ...property.data,
    //                         loadOrder: draggedColumnOrder
    //                     }
    //                 }
    //             }
    //             if (property.title === draggedColumnTitle) {
    //                 return {
    //                     ...property,
    //                     data: {
    //                         ...property.data,
    //                         loadOrder: targetColumnOrder
    //                     }
    //                 }
    //             }
    //             return property;
    //         });

    //         return {
    //             ...item,
    //             properties: updatedProperties
    //         }
    //     });

    //     handleSetItems(updatedItems);

    //     if (socket) {
    //         socket.emit('moveColumn', {
    //             targetColumnTitle, targetColumnOrder,
    //             draggedColumnTitle, draggedColumnOrder
    //         });
    //     }
    // };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => console.log("dnd: ", e.currentTarget.textContent);
    
    return (
        <div className="max-w-full px-1 overflow-x-scroll scrollbar scrollbar-thumb-light-300 dark:scrollbar-thumb-dark-700 scrollbar-track-transparent">
            <div className="flex flex-row gap-1 float-left">
                <div className="flex flex-col items-center gap-1 flex-grow">
                    <table className="w-min rounded-md ring-1 ring-light-400 dark:ring-dark-700" key={`table-${JSON.stringify(pages)}`}>
                        <thead className="bg-light-300 dark:bg-dark-800 p-4 rounded-md">
                            <tr>
                                <ColumnTable title="Título" type="text" />
                                {pages.length > 0 ? renderPropertiesTitle(pages[0]?.properties ?? [], handleDrop) || null : (
                                    <th className="text-center p-4 opacity-25">Adicione algo...</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {pages.length > 0 ? pages.sort((a, b) => {
                                const aDate = new Date(a.createdAt);
                                const bDate = new Date(b.createdAt);
                                return aDate.getTime() - bDate.getTime();
                            }).map((page, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="relative font-medium border border-light-400 dark:border-dark-700">
                                            <div className="h-full w-full flex">
                                                <div className="w-full min-h-full group">
                                                    <Title value={page.title} />
                                                    <Link
                                                        to={`/page/${page.id}`}
                                                        className="absolute top-1/2 -translate-y-1/2 right-0 opacity-0 group-hover:opacity-100 bg-light-300 dark:bg-dark-700 rounded-md px-2 py-0.5 text-xs cursor-pointer"
                                                    >Abrir</Link>
                                                </div>
                                            </div>
                                        </td>
                                        {renderPropertiesData(page)}
                                    </tr>
                                )
                            }) : (
                                <tr>
                                    <td colSpan={2} className="text-center p-4">Clique aqui ou em 'Novo' para começar.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <Button 
                        classNames="w-full px-1 py-0.5 bg-transparent text-dark-600 dark:text-light-300 hover:bg-light-300 dark:hover:bg-dark-700"
                        onClick={onCreate}
                    >+</Button>
                </div>

                <Popover 
                    direction="left-start"
                    classNames="px-2 bg-transparent text-dark-600 dark:text-light-300 hover:bg-light-300 dark:hover:bg-dark-700"
                    content={<NewColumn />}
                >+</Popover>
            </div>
        </div>
    )
}