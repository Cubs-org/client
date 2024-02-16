import clsx from "clsx";
import formatDatetime from "../../../utils/datetime/formatDatetime";
// import { Avatar } from "../../Avatar";

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
                case "status":
                    return (
                        <div key={index} className={clsx("w-fit flex gap-2 items-center text-slate-800 text-xs font-medium rounded-full pl-2 pr-3 py-0.5", {
                            "bg-slate-400" : prop.data.value === "Não iniciado",
                            "bg-yellow-400" : prop.data.value === "Em andamento",
                            "bg-green-400" : prop.data.value === "Concluído",
                        })}>
                            <span className={
                                clsx("w-2.5 h-2.5 rounded-full inline-block", {
                                    "bg-slate-300" : prop.data.value === "Não iniciado",
                                    "bg-yellow-300" : prop.data.value === "Em andamento",
                                    "bg-green-300" : prop.data.value === "Concluído",
                                })
                            
                            } />
                            {prop.data.value}
                        </div>
                    )
                case "select":
                    const color = prop.data.items.find((item) => item.value === prop.data.name)?.color;
                    return (
                        <div key={index} className={clsx("text-xs font-medium text-light-200 px-2 py-1 rounded-md", {
                            "bg-red-500" : color === "red",
                            "bg-green-500" : color === "green",
                            "bg-blue-500" : color === "blue",
                            "bg-yellow-500" : color === "yellow",
                            "bg-orange-500": color === "orange",
                            "bg-purple-500" : color === "purple",
                            "bg-pink-500" : color === "pink",
                            "bg-indigo-500" : color === "indigo",
                            "bg-gray-500" : color === "gray",
                            "bg-light-500" : color === "light",
                        })}>
                            {prop.data.value}
                        </div>
                    );
                case "multi-select":
                    return (
                        <div key={index} className="flex flex-wrap gap-1">
                            {prop.data.items.map((item, _i) => (
                                <div key={_i} className={clsx("text-xs font-normal text-light-200 px-1.5 py-0.5 rounded-md", {
                                    "bg-red-500" : item.color === "red",
                                    "bg-green-500" : item.color === "green",
                                    "bg-blue-500" : item.color === "blue",
                                    "bg-yellow-500" : item.color === "yellow",
                                    "bg-orange-500": item.color === "orange",
                                    "bg-purple-500" : item.color === "purple",
                                    "bg-pink-500" : item.color === "pink",
                                    "bg-indigo-500" : item.color === "indigo",
                                    "bg-gray-500" : item.color === "gray",
                                    "bg-light-500" : item.color === "light",
                                })}>
                                    {item.name}
                                </div>
                            ))}
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