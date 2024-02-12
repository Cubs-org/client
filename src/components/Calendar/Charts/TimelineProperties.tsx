import { Avatar } from "../../Avatar";

export const TimelineProperties = ({ item }) => {
    const properties = item?.properties;

    return (
        <div className="w-full flex flex-col gap-1 bg-light-200 dark:bg-dark-700 text-dark-800 dark:text-light-200 shadow-md px-2 py-1 rounded-md ring-1 ring-light-300 dark:ring-dark-600">
            {/* <div className="text-sm font-semibold text-dark-600 dark:text-light-300">Rec. ref. Mag. Luiza</div> */}

            {/* PROPS */}

            {/* Date */}
            {/* <span className="text-xs font-normal">12/02 - 12/02</span> */}
            
            {/* Select */}
            {/* <span className="px-3 py-1 rounded-md bg-green-500 text-light-200 text-sm w-fit">Salário</span> */}
            {/* <span className="px-3 py-1 rounded-md bg-red-500 text-light-200 text-sm w-fit">Aluguel</span> */}

            {/* Formula */}
            {/* <span className="text-sm font-medium text-green-500">+ R$ 1200,00</span> */}

            {/* Checkbox */}
            {/* <div className="w-full flex gap-1 items-center">
                <input type="checkbox" checked className="w-4 h-4 rounded-md border-2 border-light-200 dark:border-dark-600" />
                <span className="text-xs font-normal">Recebido</span>
            </div> */}

            {/* <div className="text-sm font-semibold text-dark-600 dark:text-light-300">Supermercado Koch</div> */}

            {/* MultiSelect */}
            {/* <div className="flex gap-[2px] flex-wrap">
                <span className="p-1 rounded-md bg-yellow-500 text-light-200 text-xs w-fit">Compras</span>
                <span className="p-1 rounded-md bg-blue-500 text-light-200 text-xs w-fit">Alimentação</span>
                <span className="p-1 rounded-md bg-red-500 text-light-200 text-xs w-fit">Recebimento</span>
            </div> */}

            {/* HabitTracker */}
            {/* <div className="text-sm font-semibold text-dark-600 dark:text-light-300">@Hoje</div>
            <div className="w-full flex gap-1 items-center">
                <input type="checkbox" checked className="w-4 h-4 rounded-md border-2 border-light-200 dark:border-dark-600" />
                <span className="text-xs font-normal">Treinar</span>
            </div>
            <div className="w-full flex gap-1 items-center">
                <input type="checkbox" checked className="w-4 h-4 rounded-md border-2 border-light-200 dark:border-dark-600" />
                <span className="text-xs font-normal">Ler e meditar</span>
            </div>
            <div className="w-full flex gap-1 items-center">
                <input type="checkbox" checked className="w-4 h-4 rounded-md border-2 border-light-200 dark:border-dark-600" />
                <span className="text-xs font-normal">Comer bem</span>
            </div> */}

            <div className="text-sm font-semibold text-dark-600 dark:text-light-300">Apresentação p/Dat Soluções em Tecnologia</div>

            <div className="flex gap-[2px] flex-wrap">
                <span className="p-1 rounded-md bg-red-500 text-light-200 text-xs w-fit">Marketing</span>
                <span className="p-1 rounded-md bg-green-500 text-light-200 text-xs w-fit">Venda</span>
                <span className="p-1 rounded-md bg-slate-500 text-light-200 text-xs w-fit">Apresentação</span>
            </div>

            <div className="flex gap-2 items-center">
                <Avatar 
                    icon="leao" 
                    size={18} 
                    notDisplayUsername 
                    isCircle
                />

                <span className="text-xs font-normal">Luiza Britto</span>
            </div>

            <div className="flex gap-2 items-center">
                <Avatar 
                    icon="coruja" 
                    size={18} 
                    notDisplayUsername 
                    isCircle
                />

                <span className="text-xs font-normal">Lucio Adriano</span>
            </div>

            <div className="flex gap-2 items-center">
                <Avatar 
                    icon="cavalo" 
                    size={18} 
                    notDisplayUsername 
                    isCircle
                />

                <span className="text-xs font-normal">Rafael H. C. Rizzo</span>
            </div>
        </div>
    )
}