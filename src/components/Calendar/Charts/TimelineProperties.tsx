import formatDatetime from "../../../utils/datetime/formatDatetime";
import { Avatar } from "../../Avatar";

export const TimelineProperties = ({ item }) => {
    const properties = item?.properties;

    // const getPropByType = (type) => {
    //     return properties?.find((p:any) => p.type === type);
    // }

    const renderProps = () => {
        return properties?.map((prop, index) => {
            switch (prop.type) {
                case "text":
                    return (
                        <div key={index} className="text-xs font-medium text-dark-600 dark:text-light-300">
                            {prop.data.value}
                        </div>
                    );
                case "datetime":
                    return (
                        <span key={index} className="text-[.6rem] font-normal">{formatDatetime(prop.data.start)} até {formatDatetime(prop.data.end)}</span>
                    );
                case "checkbox":
                    return (
                        <div key={index} className="w-full flex gap-1 items-center">
                            <input type="checkbox" checked={prop.data.value} className="w-4 h-4 rounded-md border-2 border-light-200 dark:border-dark-600" />
                            <span className="text-xs font-normal">{prop.name}</span>
                        </div>
                    );
            }
        });
    }

    return (
        <div className="w-full flex flex-col gap-1 bg-light-200 dark:bg-dark-700 text-dark-800 dark:text-light-200 shadow-md px-2 py-1 rounded-md ring-1 ring-light-300 dark:ring-dark-600">
            <div className="text-sm font-semibold text-dark-600 dark:text-light-300">
                {item.title}
            </div>

            {renderProps()}
        </div>
    )
}