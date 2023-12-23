import clsx from "clsx"
import { twMerge } from "tailwind-merge"
import { useState, useRef, useEffect } from "react"

interface PopoverProps {
    children: React.ReactNode;
    content: React.ReactNode;
    direction?: "top" | "bottom" | "left" | "right";
    classNames?: string;
    show?: boolean;
}

export const Popover = ({ children, content, direction, classNames, show }:PopoverProps) => {

    const [visibility, setVisibility] = useState(show ? true : false)
    const popover = useRef(null)

    const handleClickOutside = (event) => {
        // @ts-ignore
        if (popover.current && !popover.current?.contains(event.target)) {
            setVisibility(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [])

    return (
        <div 
            ref={popover}
            className="relative"
            onClick={() => setVisibility(true)}
            onBlur={() => setVisibility(false)}
        >
            {children}
            {visibility && (
                <div className={twMerge(clsx("absolute min-w-[140px] backdrop-blur-sm p-1 bg-glass-light rounded-md shadow-full dark:bg-glass-dark", {
                    "top-0": direction === "top",
                    "bottom-0": direction === "bottom",
                    "-left-[calc(140px+1rem)] top-1/2 -translate-y-1/2": direction === "left",
                    "-right-[calc(140px+1rem)] top-1/2 -translate-y-1/2": direction === "right",
                }), classNames)}>
                    {content}
                </div>
            )}
        </div>
    )
}