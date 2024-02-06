import { twMerge } from "tailwind-merge";

export interface ButtonProps extends 
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, 
    HTMLButtonElement>, 
    React.AriaAttributes 
{
    classNames?: string;
};

export const Button = ({ classNames, ...props }:ButtonProps) => (
    <button 
        type="button"
        className={twMerge(
            "flex flex-row items-center justify-center gap-2 p-2 rounded-md font-bold bg-purple-500 hover:bg-purple-600 text-light-200",
            classNames
        )}
        {...props} 
    />
);