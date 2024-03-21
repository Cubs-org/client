import clsx from "clsx"
import { Popover } from "../../Popover";

const Selected = ({ value, color }) => {
    return (
        <div className={clsx("w-max text-base font-bold px-3 py-0.5 rounded-md text-light-300 cursor-pointer transition-all ease-in", {
            "bg-red-600 hover:bg-red-700": color === "red",
            "bg-green-600 hover:bg-green-700": color === "green",
            "bg-blue-600 hover:bg-blue-700": color === "blue",
            "bg-yellow-600 hover:bg-yellow-700": color === "yellow",
            "bg-orange-600 hover:bg-orange-700": color === "orange",
            "bg-purple-600 hover:bg-purple-700": color === "purple",
            "bg-pink-600 hover:bg-pink-700": color === "pink",
            "bg-indigo-600 hover:bg-indigo-700": color === "indigo",
            "bg-gray-600 hover:bg-gray-700": color === "gray",
            "bg-transparent" : color === "transparent"
        })}>{value}</div>
    )
}

export const Select = ({ value, items, pageData }) => {

    // const { color } = items.find(item => item.name === value);
    let color = items.find(item => item.name === value)?.color || "blue";

    // TO DO: Add a way to change the value of the select

    return (
        <div className="grid place-items-center w-full h-full">
            <Popover
                width="100%"
                height="24px"
                direction="bottom-start"
                content={
                    <ul className="min-w-[200px] flex flex-col gap-1.5 p-1">
                        <li className="w-full bg-glass-light dark:bg-glass-dark rounded-md p-1 ring-1 ring-light-300 dark:ring-dark-700">
                            <Selected
                                value={value !== "" ? value : "Selecione uma opção"}
                                color={value !== "" ? color : "transparent"}
                            />
                        </li>

                        {items.map((item, index) => (
                            <li key={index} className={clsx("w-fit text-xs font-semibold px-3 py-1 rounded-md text-light-300 cursor-pointer transition-all ease-in-out", {
                                "bg-red-600 hover:bg-red-700": item.color === "red",
                                "bg-green-600 hover:bg-green-700": item.color === "green",
                                "bg-blue-600 hover:bg-blue-700": item.color === "blue",
                                "bg-yellow-600 hover:bg-yellow-700": item.color === "yellow",
                                "bg-orange-600 hover:bg-orange-700": item.color === "orange",
                                "bg-purple-600 hover:bg-purple-700": item.color === "purple",
                                "bg-pink-600 hover:bg-pink-700": item.color === "pink",
                                "bg-indigo-600 hover:bg-indigo-700": item.color === "indigo",
                                "bg-gray-600 hover:bg-gray-700": item.color === "gray",
                            })}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                }
            >
                {!value ? "" : <Selected value={value} color={color} />}
            </Popover>
        </div>
    )
}