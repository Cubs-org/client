import { useState } from "react";
import { Popover } from "./Popover";
import { FaAngleDown } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import clsx from "clsx";

interface FilterDropdownProps {
    items: any;
    direction?: "left" | "right" | "top" | "bottom" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end" | undefined;
    filterName: string;
}
 
export const FilterDropdown = ({ items, direction, filterName }:FilterDropdownProps) => {

    const [index, setIndex] = useState(0);

    let getDirection = direction?.split("-")[0];

    const [searchParams, setSearchParams] = useSearchParams();

    const handleFilter = (index:number) => {
        setIndex(index);
        // setSearchParams({ filter: items[index] });
        setSearchParams({ 
            ...Object.fromEntries(searchParams),
            [filterName]: items[index] 
        });
    }

    return (
        <Popover 
            width="100%"
            direction={direction}
            classNames="bg-light-100 text-dark-100 dark:bg-dark-700 dark:text-light-300 rounded-md flex flex-row-reverse md:flex-row items-center justify-between gap-1 text-base font-medium outline-none ring-2 ring-light-400 dark:ring-dark-600 pl-3 pr-2 py-1"
            content={
                <ul className={clsx("flex flex-col gap-1 p-1", {
                    // "flex-row": getDirection === "left" || getDirection === "right",
                    // "flex-col": getDirection === "top" || getDirection === "bottom"
                })}>
                    {items.map((item, key) => (
                        <div key={`${key}-${item}`}>
                            {key !== 0 && <div className="w-px bg-light-300 dark:bg-dark-600"></div>}
                            <li
                                className="hover:bg-light-300 dark:hover:bg-dark-600 rounded-md cursor-pointer pl-2 pr-3 py-1"
                                onClick={() => handleFilter(key)}
                            >
                                {item}
                            </li>
                        </div>
                    ))}
                </ul>
            }
        >

            {items[index]}
            
            <FaAngleDown size={12} />
        </Popover>
    );
}