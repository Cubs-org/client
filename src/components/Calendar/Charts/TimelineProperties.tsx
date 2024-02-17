import { Properties } from "../../Page/Properties";

export const TimelineProperties = ({ item }) => {
    const properties = item?.properties;

    return (
        <div className="w-full flex flex-col gap-1 bg-light-200 dark:bg-dark-700 text-dark-800 dark:text-light-200 shadow-md px-2 py-1 rounded-md ring-1 ring-light-300 dark:ring-dark-600">
            <div className="text-sm font-semibold text-dark-600 dark:text-light-300">
                {item.title}
            </div>

            <Properties properties={properties}/>
        </div>
    )
}