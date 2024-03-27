import clsx from "clsx"
import { Popover } from "../../Popover";
import { CgClose } from "react-icons/cg";

const Tags = ({ tags }) => {
    return (
        <div className="flex flex-wrap gap-1">
            {(tags.length > 0) ? tags.map((tag, index) => (
                <div key={index} className={clsx("flex items-center gap-0.5 px-2 text-xs rounded-md text-light-300", {
                    "bg-red-500": tag.color === "red",
                    "bg-green-500": tag.color === "green",
                    "bg-blue-500": tag.color === "blue",
                    "bg-yellow-500": tag.color === "yellow",
                    "bg-orange-500": tag.color === "orange",
                    "bg-purple-500": tag.color === "purple",
                    "bg-pink-500": tag.color === "pink",
                    "bg-indigo-500": tag.color === "indigo",
                    "bg-gray-500": tag.color === "gray",
                })}>
                    {tag.name}
                    <CgClose size={12}/>
                </div>
            )) : <span className="px-2 text-xs text-light-900 dark:text-dark-500">Nenhuma tag encontrada...</span>}
        </div>
    )

}

export const MultiSelect = ({ tags, items, pageData }) => {

    // TO DO: Add a way to change the value of the select

    return (
        <div className="w-full h-full grid place-items-center">
            <Popover
                width="100%"
                height="24px"
                direction="bottom-start"
                content={
                    <ul className="flex flex-col gap-1.5 p-1">

                        <li className="w-full bg-light-500 dark:bg-dark-500 rounded-md p-1 ring-1 ring-light-600 dark:ring-dark-400">
                            <Tags
                                tags={tags}
                            />
                        </li>

                        {(tags.length > 0) && <hr className="border-light-400 dark:border-dark-300" />}

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
                <Tags tags={tags} />
            </Popover>
        </div>
    )
}