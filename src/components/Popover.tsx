import clsx from "clsx"
import { twMerge } from "tailwind-merge"
import { useState, useRef, useEffect } from "react"

interface PopoverProps {
    children: React.ReactNode;
    content: React.ReactNode;
    direction?: "top" | "bottom" | "left" | "right";
    classNames?: string;
    show?: boolean;
    isModal?: boolean;
}

export const Popover = ({ children, content, direction, classNames, show, isModal=true }:PopoverProps) => {

    const [visibility, setVisibility] = useState(show ? true : false)
    const popover = useRef(null)

    useEffect(() => {
        if (show) setVisibility(true)
        else setVisibility(false)
    }, [show]);

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
            onBlur={() => !isModal && setVisibility(false)}
        >
            {children}
            {visibility && (
                <div className={twMerge(clsx("absolute min-w-[140px] md:h-fit backdrop-blur-sm p-1 bg-glass-light rounded-md shadow-full dark:bg-glass-dark", {
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