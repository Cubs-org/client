import { 
    useState,
    useEffect
} from "react";

import { DatePicker } from "../TimeControls/DatePicker";
import { ColorPicker } from "../ColorPicker";
import { Button } from "../Button";
import { useModal } from "../../contexts/modalContext";

interface ICreateTask {
    event?: any;
};

export const CreateTask = ({ event }: ICreateTask) => {
    const [titleTask, setTitleTask] = useState("");
    const [contentTask, setContentTask] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [color, setColor] = useState("");

    const { closeModal } = useModal();

    useEffect(() => {
      event ? setStartDate(event) : setStartDate("");
    }, [event]);

    const handleCompleteForm = () => {
        clean();
    }

    function clean() {
        closeModal();
        setColor("");
        setTitleTask("");
        setContentTask("");
        setStartDate("");
        setEndDate("");
    }

    return (
        <div className="w-full flex flex-col gap-3">
            <h1 className="text-2xl font-black text-dark-600 dark:text-light-100">
                Criar nova tarefa
            </h1>
            <form className="flex flex-col w-full gap-3">
                <input 
                    className="bg-light-300 text-dark-400 placeholder-light-900 focus:outline-light-400 text-xl font-bold px-3 py-2 rounded-md outline-none border-0 focus:outline-2 dark:bg-dark-800 dark:placeholder-dark-100 dark:text-light-300 dark:focus:outline-dark-100"
                    type="text" 
                    placeholder="Título da tarefa ou evento"
                    value={titleTask}
                    onChange={e => setTitleTask(e.target.value)}
                />
                <textarea 
                    className="max-h-32 bg-light-300 text-dark-400 placeholder-light-900 focus:outline-light-400 text-base font-bold px-3 py-2 rounded-md outline-none border-0 focus:outline-2 dark:bg-dark-800 dark:placeholder-dark-100 dark:text-light-300 dark:focus:outline-dark-100 scrollbar scrollbar-thumb-dark-100 scrollbar-track-transparent"
                    placeholder="Descrição"
                    value={contentTask}
                    onChange={e => setContentTask(e.target.value)}
                />
                {/* ColorPicker->select a color  */}
                <div className="w-3/6">
                    <ColorPicker 
                        color={color}
                        handleSetColor={setColor}
                    />
                </div>
                {/* DatePicker->select a date */}
                <div className="flex items-center gap-x-3">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-base font-bold text-dark-500 dark:text-light-300">Início</h3>
                        <DatePicker 
                            value={startDate}
                            handleChange={e => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-base font-bold text-dark-500 dark:text-light-300">Início</h3>
                        <DatePicker 
                            value={endDate} 
                            handleChange={e => setStartDate(e.target.value)}
                        />
                    </div>
                </div>
                <Button
                    onClick={handleCompleteForm}
                >
                        Pronto
                </Button>
            </form>
        </div>
    );
}