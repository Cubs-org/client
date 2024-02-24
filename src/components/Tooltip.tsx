import clsx from "clsx";

interface TooltipProps {
    children: React.ReactNode;
    content: string;
    disabled?: boolean;
}

export const Tooltip = ({children, content, disabled=false}:TooltipProps) => (
    <div className="relative group">
        {children}
        <span 
            className={clsx("min-w-[80px] absolute -top-8 left-1/2 -translate-x-1/2 z-10 text-xs scale-0 px-3 py-1 text-center transition-all rounded-md shadow-light-900 shadow-md bg-light-300 text-dark-600 font-semibold dark:text-light-300 dark:bg-dark-500 dark:shadow-dark-900", {
                "group-hover:scale-100": !disabled,
                "!hidden": disabled
            })}
            style={{
                width: `calc(${content.length}ch + 1rem)`,
            }}
        >{content}</span>
    </div>
)