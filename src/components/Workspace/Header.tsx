import { useState } from "react"

import { Popover } from "../Popover"
import { Search } from "../Search"
import { HeaderOptions } from "./HeaderOptions"
import { FaEllipsisVertical } from "react-icons/fa6"

export const Header = () => {
    const [search, setSearch] = useState("")

    return (
        <header className="flex justify-between items-center px-2 py-3">
            <h1 
                className="text-3xl font-extrabold text-dark-400 dark:text-light-300"
            >Área de trabalho</h1>
            <div className="flex gap-2 items-center">
                <Search 
                    type="text"
                    placeholder="Pesquisar.." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    iconVisible={search !== "" ? false : true}
                />
                <Popover 
                    classNames="w-[180px] top-56 !-left-[calc(180px-1rem)]"
                    direction="left" 
                    content={<HeaderOptions />}
                >
                    <FaEllipsisVertical size={24} className="cursor-pointer" />
                </Popover>
            </div>
        </header>
    )
}