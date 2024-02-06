import { FaBullhorn, FaCalendarWeek, FaCircleCheck } from "react-icons/fa6"
import { FaPlus } from "react-icons/fa"
import { Popover } from "../Popover"
import { Button } from "../Button"
import { useModal } from "../../contexts/modalContext";
import { CreateTask } from "./CreateTask";

export const NewItem = () => {

    const { openModal } = useModal();

    const handleCreateTask = () => {
        openModal && openModal({
            content: <CreateTask />
        });
    }

    const options = [
        {icon: <FaCircleCheck />, label: "Tarefa", onClick: handleCreateTask},
        {icon: <FaCalendarWeek />, label: "Evento", onClick: () => {}},
        {icon: <FaBullhorn />, label: "Lembrete", onClick: () => {}}
    ];

    return (
        <Popover 
            direction="bottom-start"
            content={
                <div className="flex flex-col gap-1 p-1 min-w-[200px]">
                    {options.map((opt, _i) => (
                        <div key={`${_i}-${opt}`}>
                            <Button 
                                classNames="w-full bg-transparent justify-start text-dark-300 dark:text-light-300 hover:text-light-300 hover:bg-purple-500" 
                                onClick={opt.onClick}
                            >
                                {opt.icon}
                                {opt.label}
                            </Button>
                        
                            {_i !== options.length && (<hr className="mt-1 border-light-300 dark:border-dark-100"/>)}
                        </div>
                    ))}
                </div>
            }
        >
            <span className="flex items-center gap-2 px-3 py-2 bg-purple-500 text-light-100 text-base font-semibold rounded-md">
                <FaPlus />
                <span className="hidden md:block">Novo</span>
            </span>
        </Popover>
    )
}