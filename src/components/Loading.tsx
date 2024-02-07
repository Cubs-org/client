import { FaSpinner } from "react-icons/fa";

export default function Loading() {
    return (
        <div className="w-full h-full grid place-items-center bg-light-100 dark:bg-dark-900">
            <FaSpinner size={32} className="animate-spin transition-all text-light-900 dark:text-dark-300" />
        </div>
    )
}