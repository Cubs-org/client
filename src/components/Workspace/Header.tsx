import { FaArrowDownAZ, FaEllipsisVertical, FaPenToSquare, FaTableCells, FaTableList } from "react-icons/fa6"
import { Popover } from "../Popover"
import { FaCheck, FaRegCalendarAlt } from "react-icons/fa"
import { Search } from "../Search"
import { useState } from "react"

const HeaderOptions = () => {
    const optionsClassnames = "text-dark-400 data-[selected=true]:bg-purple-600 data-[selected=true]:border-[.1rem] data-[selected=true]:border-purple-300 data-[selected=true]:text-purple-300 dark: data-[selected=true]:border-purple-400 dark:data-[selected=true]:text-purple-400 dark:data-[selected=true]:bg-purple-900 flex justify-between items-center text-sm px-[.6rem] py-1 rounded-md dark:text-light-600 hover:bg-light-300 dark:hover:bg-dark-300 hover:cursor-pointer"
    
    return (
        <ul className="flex flex-col gap-1 text-light-900">
            <li className="p-[.3rem] font-semibold dark:text-light-400 text-dark-700">Visualização</li> {/* applied-filters */}

            <li data-selected={true} className={optionsClassnames}><div className="flex items-center gap-1"><FaTableCells />Grade</div><span data-selected={true} className="data-[selected=true]:!block hidden"><FaCheck size={8}/></span></li>
            <li data-selected={false} className={optionsClassnames}><div className="flex items-center gap-1"><FaTableList/>Lista</div><span data-selected={false} className="data-[selected=true]:!block hidden"><FaCheck size={8}/></span></li>
            
            <hr className="border-dark-200" />

            <li className="p-[.3rem] font-semibold dark:text-light-400 text-dark-700">Aplicar filtros</li> {/* applied-filters */}

            <li data-selected={false} className={optionsClassnames}><div className="flex items-center gap-1"><FaRegCalendarAlt />Criado em</div><span data-selected={false} className="data-[selected=true]:!block hidden"><FaCheck size={8}/></span></li>
            <li data-selected={false} className={optionsClassnames}><div className="flex items-center gap-1"><FaPenToSquare />Atualizado em</div><span data-selected={false} className="data-[selected=true]:!block hidden"><FaCheck size={8}/></span></li>
            <li data-selected={true} className={optionsClassnames}><div className="flex items-center gap-1"><FaArrowDownAZ />Alfabética </div><span data-selected={true} className="data-[selected=true]:!block hidden"><FaCheck size={8}/></span></li>
            
            <hr className="border-dark-200" />

            <li className="p-[.3rem] font-semibold dark:text-light-400 text-dark-700">Mais opções</li> {/* applied-filters */}

            <li data-selected={false} className={optionsClassnames}><div className="flex items-center gap-1">s/participantes</div><span data-selected={false} className="data-[selected=true]:!block hidden"><FaCheck size={8}/></span></li>
            <li data-selected={false} className={optionsClassnames}><div className="flex items-center gap-1">c/participantes</div><span data-selected={false} className="data-[selected=true]:!block hidden"><FaCheck size={8}/></span></li>
        </ul>
    )
}

export const Header = () => {
    const [search, setSearch] = useState("")

    return (
        <header className="flex justify-between items-center px-2 py-3">
            <h1 className="md:text-3xl lg:text-4xl font-extrabold text-dark-400 dark:text-light-300">Workspace</h1>
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