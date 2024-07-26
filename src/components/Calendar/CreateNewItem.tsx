import { 
    useState,
    useEffect,
} from "react";

import { DatePicker } from "../TimeControls/DatePicker";
import { ColorPicker } from "../ColorPicker";
import { Button } from "../Button";
import { useModal } from "../../contexts/modalContext";
import { useUser } from "../../contexts/userContext";
import { useSocket } from "../../contexts/socketContext";

interface ICreateTask {
    event?: any;
    type?: string;
};

export const CreateNewItem = ({ event, type }: ICreateTask) => {
    const { user: {data: { email }} } = useUser();

    const { closeModal } = useModal();
    const { listener } = useSocket();

    const handleSetColor = (color:string) => {
        setFormData({
            ...formData,
            color
        });
    }

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        start: "",
        end: "",
        completed: false,
        owner: email,
        color: "blue",
        type: type || "task",
    });

    const handleCompleteForm = () => {
        if (!listener) return;

        listener.emit("request:createNewItem", formData);
        
        clean();
    }

    function clean() {
        closeModal();
        setFormData({
            title: "",
            description: "",
            start: "",
            end: "",
            completed: false,
            owner: "",
            color: "",
            type: type || "task"
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ 
            ...formData, 
            [name]: value
        });
    };

    useEffect(() => {
        event && setFormData({
            ...formData,
            start: event,
            end: event
        });
    }, [event]);

    return (
        <div className="w-full flex flex-col gap-3">
            <h1 className="text-2xl font-black text-dark-600 dark:text-light-100">
                Criar nov{type === "task" ? "a tarefa" : "o evento"}
            </h1>
            <form className="flex flex-col w-full gap-3">
                <input 
                    className="bg-light-300 text-dark-400 placeholder-light-900 focus:outline-light-400 text-xl font-bold px-3 py-2 rounded-md outline-none border-0 focus:outline-2 dark:bg-dark-800 dark:placeholder-dark-100 dark:text-light-300 dark:focus:outline-dark-100"
                    type="text" 
                    placeholder={`Título d${type === "task" ? "a tarefa" : "o evento"}`}
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <textarea 
                    className="max-h-32 bg-light-300 text-dark-400 placeholder-light-900 focus:outline-light-400 text-base font-bold px-3 py-2 rounded-md outline-none border-0 focus:outline-2 dark:bg-dark-800 dark:placeholder-dark-100 dark:text-light-300 dark:focus:outline-dark-100 scrollbar scrollbar-thumb-dark-100 scrollbar-track-transparent"
                    placeholder="Descrição"
                    name="content"
                    value={formData.description}
                    onChange={handleChange}
                />
                {/* ColorPicker->select a color  */}
                <div className="w-3/6">
                    <ColorPicker 
                        color={formData.color}
                        handleSetColor={handleSetColor}
                    />
                </div>
                {/* DatePicker->select a date */}
                <div className="flex items-center gap-x-3">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-base font-bold text-dark-500 dark:text-light-300">Início</h3>
                        <DatePicker 
                            value={formData.start}
                            name="start"
                            handleChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-base font-bold text-dark-500 dark:text-light-300">Início</h3>
                        <DatePicker 
                            value={formData.end} 
                            name="end"
                            handleChange={handleChange}
                        />
                    </div>
                </div>
                <Button onClick={handleCompleteForm}>
                    Pronto
                </Button>
            </form>
        </div>
    );
}