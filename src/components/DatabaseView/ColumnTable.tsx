import clsx from "clsx";
import { renderIcon } from "../Page/renderProperties";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../../lib/api";
import { Popover } from "../Popover";

import { CgChevronRight, CgTrash } from "react-icons/cg";
import { Editor } from "../Page/Properties/Formula/Editor";

interface ColumnTableProps {
    id?: string;
    title: string;
    type: string;
    value?: any;
    loadOrder?: number;
    width?: number;

    handleDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
}

const EditColumn = ({ title, type, value }) => {
    return (
        <ul className="flex flex-col gap-2 p-2">
            <li className="text-sm font-bold flex gap-1 items-center">
                <span className="w-max h-max p-1">
                    {renderIcon(type)}
                </span>
                <input 
                    type="text" 
                    value={title} 
                    className="w-full px-3 py-0.5 bg-glass-light dark:bg-glass-dark rounded-md ring-1 ring-light-500 dark:ring-dark-700 text-sm font-bold outline-none"
                    readOnly 
                />
            </li>
            <li className="px-2 py-1 rounded-md cursor-pointer text-sm font-bold flex items-center justify-between hover:bg-glass-light hover:dark:bg-glass-dark">
                Propriedade <span className="flex items-center justify-between"><p className="text-xs text-dark-100 dark:text-light-900">{type}</p><CgChevronRight size={18} /></span>
            </li>
            {type === "formula" && (
                <Popover
                    content={<Editor content={value} />}
                    direction="bottom-start"
                    width="100%"
                >
                    <li className="px-2 py-1 rounded-md cursor-pointer text-sm font-bold flex items-center justify-between hover:bg-glass-light hover:dark:bg-glass-dark">
                        Editar <span className="flex items-center justify-between"><CgChevronRight size={18} /></span>
                    </li>
                </Popover>
            )}
            <hr className="border-light-400 dark:border-dark-300" />
            <li className="px-2 py-1 rounded-md cursor-pointer text-sm font-bold text-red-500 dark:text-red-400 flex items-center gap-1 hover:bg-glass-light hover:dark:bg-glass-dark">
                <CgTrash size={18}/> Deletar
            </li>
        </ul>
    );
};

export const ColumnTable = ({
    title,
    type,
    value,
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
                data-column-title={title}
                data-column-order={loadOrder}
                className={clsx(
                    "w-full h-full flex gap-2 font-bold items-center px-2 py-1 cursor-pointer truncate bg-light-300 dark:bg-dark-800",
                    {
                        "min-w-fit cursor-not-allowed": title === "Título"
                    }
                )}
            >
                <Popover
                    content={
                        <EditColumn 
                            title={title} 
                            type={type}
                            value={value}
                        />
                    }
                    direction="bottom-start"
                    width="100%"
                >
                    <span className="w-full flex flex-row items-center gap-2 text-base font-bold truncate">
                        {renderIcon(type)}
                        {title}
                    </span>
                </Popover>
            </div>
        </th>
    );
};
