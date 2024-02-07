import { BsFilterRight } from "react-icons/bs";
import { FilterDropdown } from "../FilterDropdown";
import { Popover } from "../Popover";

export const FilterVisualization = () => (
    <Popover
        direction="right-start"
        content={
            <div className="flex flex-col gap-2 p-1">
                <FilterDropdown
                    direction="right-start"
                    filterName="view"
                    items={["Mês", "Semana", "Dia"]}
                />
                <hr className="border-light-300 dark:border-dark-100"/>
                <FilterDropdown
                    direction="right-start"
                    filterName="filterBy"
                    items={["Tarefas", "Eventos", "Lembretes", "Todos"]} 
                />
            </div>
        }
    >
        <span 
            className="flex p-1 md:p-2 md:pr-3 gap-2 items-center text-base font-semibold bg-purple-500 hover:bg-purple-600 text-light-100 rounded-md"
        >
            <BsFilterRight size={24} />
            <span className="hidden md:block">Filtros</span>
        </span>
    </Popover>
)