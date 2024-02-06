import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface CheckProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, React.AriaAttributes {
    classNames?: string;
    showIcon?: boolean;
}

export const Check = ({ classNames, ...props }: CheckProps) => {

    const [check, setCheck] = useState(props.checked || false);

    return (
        <span
            data-success={check}
            className={twMerge("relative flex justify-center items-center rounded-md cursor-pointer text-light-800 dark:text-light-900 bg-light-400 dark:bg-dark-300 data-[success=true]:!bg-green-500 data-[success=true]:!text-light-300", classNames)}>
            <input
                type="checkbox"
                name={props.name || "check"}
                checked={props.checked}
                className="absolute w-full h-full opacity-0 cursor-pointer"
                onClick={() => setCheck(!check)}
                {...props}
            />
            <FaCheck />
        </span>
    );
};