import { FaCheck } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface CheckProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes {
    // value: boolean;
    classNames?: string;
}

export const Check = ({value, classNames, ...props}:CheckProps) => (
    <button 
        type="button"
        className={twMerge("flex justify-center items-center rounded-md cursor-pointer text-light-400 bg-light-400 dark:bg-dark-300", classNames)}
        {...props}
    ><FaCheck/></button>
)