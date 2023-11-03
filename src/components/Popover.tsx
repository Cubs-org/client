import clsx from "clsx";
import { useState } from "react";

interface PopoverProps {
    children: React.ReactNode;
    content: React.ReactNode;
    direction?: "top" | "bottom" | "left" | "right";
}

export const Popover = ({ children, content, direction }:PopoverProps) => {
    const [visibility, setVisibility] = useState(false);

    return (
        <div 
            className="relative"
            onClick={() => setVisibility(!visibility)}
            onBlur={() => setVisibility(false)}
        >
            {children}
            {visibility && (
                <div className={clsx("absolute min-w-[140px] p-1 bg-light-200 rounded-md shadow-full dark:bg-dark-600", {
                    "top-0": direction === "top",
                    "bottom-0": direction === "bottom",
                    "-left-6": direction === "left",
                    "-right-[calc(140px+1rem)] top-1/2 -translate-y-1/2": direction === "right"
                })}>
                    {content}
                </div>
            )}
        </div>
    )
}