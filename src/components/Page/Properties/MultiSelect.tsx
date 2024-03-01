import clsx from "clsx"
import { Popover } from "../../Popover";

const Tags = ({ tags }) => {
    return (
        <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
                <div key={index} className={clsx("px-2 py-1 text-xs rounded-md text-light-300", {
                    "bg-red-500": tag.color === "red",
                    "bg-green-500": tag.color === "green",
                    "bg-blue-500": tag.color === "blue",
                    "bg-yellow-500": tag.color === "yellow",
                    "bg-orange-500": tag.color === "orange",
                    "bg-purple-500": tag.color === "purple",
                    "bg-pink-500": tag.color === "pink",
                    "bg-indigo-500": tag.color === "indigo",
                    "bg-gray-500": tag.color === "gray",
                })}>{tag.name}</div>
            ))}
        </div>
    )

}

export const MultiSelect = ({ value, items, pageData }) => {

    // TO DO: Add a way to change the value of the select

    return (
        <div className="py-1"> 

            <Popover
                width="100%"
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
                <Tags tags={value} />
            </Popover>
        </div>
    )
}