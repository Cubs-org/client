import { 
    useState,
    useEffect
} from "react";

import { DatePicker } from "../DatePicker";
import { ColorPicker } from "../ColorPicker";
import { Button } from "../Button";

interface ICreateTask {
    event?: string;
    onClose: () => void;
};

export const CreateTask = ({ event, onClose }: ICreateTask) => {
    const [titleTask, setTitleTask] = useState("");
    const [contentTask, setContentTask] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [color, setColor] = useState("");

    useEffect(() => {
      event ? setStartDate(event) : setStartDate("");
    }, [event]);

    const handleCompleteForm = () => {
        clean();
    }

    function clean() {
        onClose();
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
            <div className="flex flex-col w-full gap-3">
                <input 
                    className="bg-light-300 text-dark-400 placeholder-light-900 focus:outline-light-400 text-xl font-bold px-3 py-2 rounded-md outline-none border-0 focus:outline-2 dark:bg-dark-700 dark:placeholder-dark-100 dark:text-light-300 dark:focus:outline-dark-100"
                    type="text" 
                    placeholder="Título da tarefa ou evento"
                    value={titleTask}
                    onChange={e => setTitleTask(e.target.value)}
                />
                <textarea 
                    className="max-h-32 bg-light-300 text-dark-400 placeholder-light-900 focus:outline-light-400 text-base font-bold px-3 py-2 rounded-md outline-none border-0 focus:outline-2 dark:bg-dark-700 dark:placeholder-dark-100 dark:text-light-300 dark:focus:outline-dark-100 scrollbar scrollbar-thumb-dark-100 scrollbar-track-transparent"
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
                            handleSetValue={setStartDate}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-base font-bold text-dark-500 dark:text-light-300">Início</h3>
                        <DatePicker 
                            value={endDate} 
                            handleSetValue={setEndDate}
                        />
                    </div>
                </div>
                <Button
                    onClick={handleCompleteForm}
                >
                        Pronto
                </Button>
            </div>
        </div>
    );
}