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
    handleDrop
}: ColumnTableProps) => {
    const columnRef = useRef<HTMLTableHeaderCellElement>(null);
    const [columnSize, setColumnSize] = useState<number>(width ? width : 300);
    const [click, setClick] = useState(false);

    const handleStartResizable = (e: React.MouseEvent<HTMLTableHeaderCellElement>) => {
        e.stopPropagation();
        setClick(true);
        const initialX = e.clientX;

        const handleMouseMove = (e: MouseEvent) => {
            const diff = initialX - e.clientX;
            setColumnSize(columnSize - diff);
        };

        const handleMouseUp = () => {
            setClick(false);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        const handleMouseLeave = () => {
            setClick(false);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mouseleave", handleMouseLeave);
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation();

        if (!click) return;

        e.dataTransfer.setData("text/plain", e.currentTarget.getAttribute("data-column-title") || "");
        e.dataTransfer.setData("text/number", e.currentTarget.getAttribute("data-column-order") || "");
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setClick(true);
        // columnRef.current!.style.backgroundColor = "#00f";
    }

    return (
        <th
            scope="col"
            ref={columnRef}
            style={{ minWidth: `${columnSize}px` }}
            className={clsx(
                "pl-0 py-0 pr-2 my-0 cursor-col-resize text-left border-r border-light-500 dark:border-dark-700 hover:bg-light-400 dark:hover:bg-dark-600"
            )}
            
            onMouseDown={handleStartResizable}
        >
            <div
                draggable={true}
                onDragStart={handleDragStart}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={(e) => e.stopPropagation()}

                onMouseDown={(e) => {
                    e.stopPropagation();
                    setClick(true);
                }}
                onMouseUp={(e) => {
                    e.stopPropagation();
                    setClick(false);
                }}

                data-column-title={title}
                data-column-order={loadOrder}
                className={clsx(
                    "w-full h-full flex gap-2 font-bold items-center px-2 py-1 cursor-pointer truncate bg-light-300 dark:bg-dark-800",
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
