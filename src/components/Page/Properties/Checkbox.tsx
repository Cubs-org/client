import clsx from "clsx";
import { FaCheck } from "react-icons/fa";

export const Checkbox = ({ value }) => (
    <div className={clsx("w-max gap-1 grid place-items-center relative cursor-pointer group", {
        "text-gray-100": value,
        "text-transparent hover:text-light-400 dark:hover:text-dark-700": !value
    })}>
        <input
            data-success={value}
            className="absolute w-4 h-4 data-[success=true]:bg-blue-500 group-hover:data-[success=true]:bg-blue-600 data-[success=true]:border-none border border-separate border-light-400 dark:border-dark-600 cursor-pointer rounded-sm appearance-none"
            type="checkbox"
            checked={value}
            readOnly
        />
        <FaCheck size={12} className="z-10" />
    </div>
);