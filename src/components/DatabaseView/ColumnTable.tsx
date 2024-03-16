import clsx from "clsx";
import { renderIcon } from "../Page/renderProperties";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../../lib/api";

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
    width=200,
    loadOrder,
    handleDrop
}: ColumnTableProps) => {

    const socket = io(SOCKET_URL, {transports: ['websocket']});

    const columnRef = useRef<HTMLTableHeaderCellElement>(null);
    const [columnSize, setColumnSize] = useState<number>(width);
    const [isResizing, setIsResizing] = useState(false);

    let props = {};

    if (width) {
        props = { style: { minWidth: `${columnSize}px` } };
    }

    useEffect(() => {
        setColumnSize(width);
    }, [width]);

    const handleStartResizable = (e: React.MouseEvent<HTMLTableHeaderCellElement>) => {
        e.stopPropagation();
        setIsResizing(true);
        const initialX = e.clientX;

        const handleMouseMove = (e: MouseEvent) => {
            const diff = initialX - e.clientX;
            setColumnSize(columnSize - diff);
        };

        const handleMouseUp = () => {
            setIsResizing(false);

            if (columnRef.current) {
                console.log('handleSetColumnWidth:', title, columnRef.current.offsetWidth);
                handleSetColumnWidth(title, columnRef.current.offsetWidth);
            }

            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        const handleMouseLeave = () => {
            setIsResizing(false);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mouseleave", handleMouseLeave);
    };

    const handleSetColumnWidth = (columnTitle: string, newWidth: number) => {
        socket.emit('resizeColumn', { columnTitle, newWidth });
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation();
        
        if (!isResizing) return;
    
        e.dataTransfer.setData("text/plain", e.currentTarget.getAttribute("data-column-title") || "");
        e.dataTransfer.setData("text/number", e.currentTarget.getAttribute("data-column-order") || "");
    };
    
    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsResizing(false);
        e.dataTransfer.clearData();
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <th
            scope="col"
            ref={columnRef}
            className={clsx("pl-0 py-0 pr-2 my-0 cursor-col-resize text-left border-r border-light-500 dark:border-dark-700 hover:bg-light-400 dark:hover:bg-dark-600")}
            onMouseDown={handleStartResizable}
            {...props}
        >
            <div
                draggable={true}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={(e) => e.stopPropagation()}
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
