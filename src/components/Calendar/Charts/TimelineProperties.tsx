import { Properties } from "../../Page/Properties";

export const TimelineProperties = ({ item }) => {
    const properties = item?.properties;

    return (
        <div className="w-full min-h-full flex-grow flex flex-col gap-1 bg-glass-light backdrop-blur-md dark:bg-glass-dark text-dark-800 dark:text-light-200 shadow-md px-2 py-1 rounded-md ring-1 ring-light-300 dark:ring-dark-600">
            <div className="text-sm font-semibold text-dark-600 dark:text-light-300">
                {item.title}
            </div>

            <Properties properties={properties}/>
        </div>
    )
}