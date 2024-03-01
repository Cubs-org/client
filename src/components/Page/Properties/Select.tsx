import clsx from "clsx"
import { Popover } from "../../Popover";

export const Select = ({ value, items, pageData }) => {

    const { color } = items.find(item => item.name === value);

    // TO DO: Add a way to change the value of the select

    return (
        <div className="py-1"> 

            <Popover
                direction="bottom-start"
                content={
                    <ul className="flex flex-col gap-1.5 p-1">
                        {items.map((item, index) => (
                            <li key={index} className={clsx("w-fit text-xs font-semibold px-3 py-1 rounded-md text-light-300", {
                                "bg-red-500": item.color === "red",
                                "bg-green-500": item.color === "green",
                                "bg-blue-500": item.color === "blue",
                                "bg-yellow-500": item.color === "yellow",
                                "bg-orange-500": item.color === "orange",
                                "bg-purple-500": item.color === "purple",
                                "bg-pink-500": item.color === "pink",
                                "bg-indigo-500": item.color === "indigo",
                                "bg-gray-500": item.color === "gray",
                            })}>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                }
            >
                <div className={clsx("text-base px-3 py-0.5 rounded-md text-light-300", {
                    "bg-red-500": color === "red",
                    "bg-green-500": color === "green",
                    "bg-blue-500": color === "blue",
                    "bg-yellow-500": color === "yellow",
                    "bg-orange-500": color === "orange",
                    "bg-purple-500": color === "purple",
                    "bg-pink-500": color === "pink",
                    "bg-indigo-500": color === "indigo",
                    "bg-gray-500": color === "gray",
                })}>{value}</div>
            </Popover>
        </div>
    )
}