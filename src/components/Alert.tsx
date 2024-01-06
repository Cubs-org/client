import clsx from "clsx";
import { FaTriangleExclamation, FaX, FaCheck, FaCircleInfo } from "react-icons/fa6";
import { AlertProps } from "../interfaces/alert";

export const Alert = ({ message, type }:AlertProps) => {
    return (
        <div className={clsx("w-full px-2 py-1 flex items-center gap-2 border-2 rounded-md font-thin", {
            "bg-green-100 border-green-500 text-green-600": type === "success",
            "bg-red-100 border-red-500 text-red-600": type === "error",
            "bg-yellow-100 border-yellow-500 text-yellow-600": type === "warning",
            "bg-slate-100 border-slate-500 text-slate-600": type === "info",
        })}>
            {type === "success" && (
                <FaCheck size={14}/>
            ) || type === "error" && (
                <FaX  size={14}/>
            ) || type === "warning" && (
                <FaTriangleExclamation  size={14}/>
            ) || type === "info" && (
                <FaCircleInfo  size={14}/>
            )}
            <p className="font-medium text-base">{message}</p>
        </div>
    );
}