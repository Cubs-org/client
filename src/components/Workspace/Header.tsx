import { useState } from "react"

import { Popover } from "../Popover"
import { Search } from "../Search"
import { FaEllipsisVertical } from "react-icons/fa6"
import { WorkspaceFilterOptions } from "./WorkspaceFilterOptions"

export const Header = () => {
    const [search, setSearch] = useState("")

    const [options, setOptions] = useState(false)

    const toggleOptions = () => setOptions(!options);

    return (
        <header className="w-full flex flex-col-reverse gap-3 md:flex-row justify-between items-center px-2 py-3">
            
            <div className="w-full md:w-fit flex flex-col justify-center">
                <h1 
                    className="text-2xl md:text-3xl font-extrabold text-dark-400 dark:text-light-300"
                >Área de trabalho</h1>
                <span 
                    className="text-sm md:text-base text-dark-300 dark:text-light-500"
                >Total de projetos: 3</span>
            </div>

            <div className="w-full md:w-fit flex justify-end gap-2 items-center">

                <Search 
                    type="text"
                    placeholder="Pesquisar.." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    iconVisible={search !== "" ? false : true}
                    classNames="w-full md:w-[300px]"
                />

                <Popover
                    direction="bottom-start"
                    content={<WorkspaceFilterOptions />}
                >
                    <div className="w-fit p-2">
                        <FaEllipsisVertical size={24} className="cursor-pointer" onClick={toggleOptions} />
                    </div>
                </Popover>


            </div>
        </header>
    )
}