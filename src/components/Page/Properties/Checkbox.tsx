import clsx from "clsx";
import { FaCheck } from "react-icons/fa";

export const Checkbox = ({ value }) => (
    <div className={clsx("w-max gap-1 grid place-items-center relative", {
        "text-gray-100": value,
        "text-transparent": !value
    })}>
        <input
            data-success={value}
            className="absolute w-4 h-4 data-[success=true]:bg-blue-500 border border-separate border-light-400 dark:border-dark-600 cursor-pointer rounded-sm appearance-none"
            type="checkbox"
            checked={value}
            readOnly
        />
        <FaCheck size={12} className="z-10" />
    </div>
);