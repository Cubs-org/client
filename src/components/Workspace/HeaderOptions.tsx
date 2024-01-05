import { FaArrowDownAZ, FaPenToSquare, FaTableCells, FaTableList } from "react-icons/fa6"
import { FaCheck, FaRegCalendarAlt } from "react-icons/fa"

export const HeaderOptions = () => {
    const options = [
        {
            divider: true, 
            name: "Visualização", 
            items: [
                { name: "Grade", icon: <FaTableCells /> },
                { name: "Lista", icon: <FaTableList />}
            ]
        },
        {
            divider: true, 
            name: "Aplicar filtros", 
            items: [
                { name: "Criado em", icon: <FaRegCalendarAlt /> },
                { name: "Atualizado em", icon: <FaPenToSquare /> },
                { name: "Alfabética", icon: <FaArrowDownAZ /> }
            ]
        },
        {
            divider: false, 
            name: "Outras opções", 
            items: [
                { name: "s/participantes", icon: null },
                { name: "c/participantes", icon: null }
            ]
        }
    ]

    /* userPreferencesStorage - func() => onclick(setvalue) */

    return (
        <ul className="flex flex-col gap-1 p-1">
            {options.map((option, index) => (
                <li key={index}>
                    <p className="text-sm text-dark-600 font-semibold py-1 dark:text-light-200">{option.name}</p>
                    <ul className="flex flex-col gap-1">
                        {option.items.map((item, index) => (
                            <li key={index}>
                                <div data-selected={true} className="text-dark-400 data-[selected=true]:bg-glass-purple-l1 data-[selected=true]:border-[.1rem] data-[selected=true]:text-purple-300 data-[selected=true]:border-purple-300 dark:data-[selected=true]:border-purple-400 dark:data-[selected=true]:text-purple-200 hover:data-[selected=true]:bg-glass-purple-l2 dark:data-[selected=true]:bg-glass-purple-d1 hover:dark:data-[selected=true]:bg-glass-purple-d2 flex justify-between items-center text-sm px-[.6rem] py-1 rounded-md dark:text-light-600 hover:bg-light-300 dark:hover:bg-dark-300 hover:cursor-pointer">
                                    <span className="flex items-center gap-2">
                                        {item.icon}
                                        <span>{item.name}</span>
                                    </span>
                                    <FaCheck className="hidden" />
                                </div>
                            </li>
                        ))}
                    </ul>
                    {option.divider && <div className="mt-2 border-b border-light-300 dark:border-dark-300"></div>}
                </li>
            ))}
        </ul>
    )
}