import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';
import { FaSistrix } from 'react-icons/fa6';

interface SearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    type: 'text';
    iconVisible?: boolean;
    classNames?: string;
}

export const Search = ({ iconVisible, classNames, ...props }:SearchProps) => {
    return (
        <div className={clsx("relative", classNames)}>
            <input
                className={clsx("bg-light-200 dark:bg-dark-800 dark:text-light-600 text-dark-700 rounded-md px-3 py-2 w-full focus:ring-2 focus:ring-light-500 focus:outline-none dark:focus:ring-dark-300", classNames)} 
                placeholder="Pesquisar"
                autoFocus
                {...props}
            />
            <span data-visible={iconVisible} className="h-full absolute top-2 right-2 text-light-300 dark:text-dark-300 data-[visible=false]:hidden">
                <FaSistrix size={24}/>
            </span>
        </div>
    )
}