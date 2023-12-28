import clsx from "clsx";
import { FaTriangleExclamation, FaX, FaCheck } from "react-icons/fa6";

interface AlertProps {
    message: string;
    type: "success" | "error" | "warning";
};

export const Alert = ({ message, type }:AlertProps) => {
    return (
        <div className={clsx("w-full px-2 py-1 flex items-center gap-2 border-2 rounded-md", {
            "bg-green-200 border-green-500 text-green-600": type === "success",
            "bg-red-200 border-red-500 text-red-600": type === "error",
            "bg-yellow-200 border-yellow-500 text-yellow-600": type === "warning",
        })}>
            {type === "success" && (
                <FaCheck size={14}/>
            ) || type === "error" && (
                <FaX  size={14}/>
            ) || type === "warning" && (
                <FaTriangleExclamation  size={14}/>
            )}
            <p className="font-medium text-base">{message}</p>
        </div>
    );
}