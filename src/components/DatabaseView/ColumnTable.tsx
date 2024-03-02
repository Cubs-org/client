import clsx from "clsx";
import { renderIcon } from "../Page/renderProperties";
import { useRef, useState } from "react";

interface ColumnTableProps {
    id?: string;
    title: string;
    type: string;
    icon?: string;
    loadOrder?: number;
    width?: number;

    handleDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const ColumnTable = ({
    title,
    type,
    icon,
    width,
    loadOrder,
    id,
    handleDrop
}: ColumnTableProps) => {
    const columnRef = useRef<HTMLTableHeaderCellElement>(null);
    const [columnSize, setColumnSize] = useState<number>(width ? width : 300);
    const [click, setClick] = useState(false);

    const handleResize = (e: React.DragEvent<HTMLTableHeaderCellElement>) => {
        e.stopPropagation();

        if (click) return;

        const offset = e.clientX - columnRef.current!.getBoundingClientRect().left;
        setColumnSize(offset);
    };

    const handleStartResizable = (e: React.DragEvent<HTMLTableHeaderCellElement>) => {
        e.stopPropagation();
        // columnRef.current!.style.backgroundColor = "#f00";
    };

    const handleEndResizable = (e: React.DragEvent<HTMLTableHeaderCellElement>) => {
        e.stopPropagation();
        // columnRef.current!.style.backgroundColor = "#ff0";
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (!click) return;
        e.dataTransfer.setData("text/plain", e.currentTarget.getAttribute("data-column-id") || "");
        e.dataTransfer.setData("text/number", e.currentTarget.getAttribute("data-column-order") || "");
    };

    return (
        <th
            scope="col"
            ref={columnRef}
            style={{ minWidth: `${columnSize}px` }}
            className={clsx(
                "pl-0 py-0 pr-2 my-0 cursor-col-resize text-left border-r border-light-500 dark:border-dark-700 hover:border-light-600 dark:hover:border-dark-600"
            )}
            draggable={true}
            onDragOver={(e) => e.stopPropagation()}
            onDragStart={handleStartResizable}
            onDrag={handleResize}
            onDragEnd={handleEndResizable}
        >
            <div
                draggable={true}
                onDragStart={handleDragStart}
                onDrop={(e) => {
                    if (!handleDrop || !click) return;
                    setClick(true);
                    handleDrop(e);
                }}

                onDragOver={(e) => e.preventDefault()}
                onClick={(e) => e.stopPropagation()}

                onMouseDown={(e) => {
                    e.stopPropagation();
                    setClick(true);
                }}
                onMouseUp={(e) => {
                    e.stopPropagation();
                    setClick(false);
                }}

                data-column-id={id}
                data-column-order={loadOrder}
                className={clsx(
                    "w-full h-full flex gap-2 items-center px-2 py-1 cursor-pointer truncate",
                    {
                        "min-w-fit cursor-not-allowed": title === "Título"
                    }
                )}
            >
                {icon ? icon : renderIcon(type)}
                {title}
            </div>
        </th>
    );
};
