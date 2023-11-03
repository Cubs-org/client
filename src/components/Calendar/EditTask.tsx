import { useEffect, useState } from "react";

import { DatePicker } from "../DatePicker";
import { ColorPicker } from "../ColorPicker";
import { Button } from "../Button";
import { Avatar } from "../Avatar";
import { Check } from "../Check";
// import { Alert } from "../Alert";

import { Member, Task } from "../../interfaces/task";
import { IModal } from "../../interfaces/modal";
import { useModal } from "../../contexts/modalContext";
import { AddMembers } from "../AddMembers";

interface TaskProps {
    task: Task;
    onClose: () => void;
}

export const EditTask = ({ task, onClose }:TaskProps) => {
    const [titleTask, setTitleTask] = useState(task.title);
    const [contentTask, setContentTask] = useState("");

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [color, setColor] = useState("");
    const [completedTask, setCompletedTask] = useState(false);
    const [members, setMembers] = useState<Member[]>([{ userId:"" }]);

    const [owner, setOwner] = useState("batma");

    const handleCompleteForm = () => {
        clean();
        console.log("Depois", task)
    }

    function clean() {
        onClose();
        setColor("");
        setTitleTask("");
        setContentTask("");
        setStartDate("");
        setEndDate("");
        setCompletedTask(false);
    }

    // @ts-ignore
    // const { openModal, closeModal }:IModal = useModal();
    
    const handleAddMembers = () => {
        let data = getAllFormData();
        // @ts-ignore
        openModal({content: <AddMembers task={data} onClose={closeModal} />})
    }

    const getAllFormData = () => {
        let data:Task = {
            title: titleTask,
            content: contentTask,
            start: startDate,
            end: endDate,
            completed: completedTask,
            owner: owner,
            tag: {color: color}
        };

        if (task.membership && task.membership.length > 0) {
            task.membership.map(member => data.membership?.push({ userId: member.userId }));
        }

        return data;
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <h1 className="text-2xl font-black text-dark-600 dark:text-light-100">
                Editar tarefa
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
                {task.tag.stage && (
                    <div className="flex justify-between items-center w-full py-2 font-bold">
                        Editado em 00/00/0000
                        <span className={`bg-${task.tag.color}-500 px-3 py-1 rounded-md`}>{task.tag.stage}</span>
                    </div>
                )}
                {/* ColorPicker->select a color */}
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
                    <h3 className="text-base font-bold text-dark-500 dark:text-light-300">Fim</h3>
                        <DatePicker 
                            value={endDate} 
                            handleSetValue={setEndDate}
                        />
                    </div>
                </div>
                {task.membership && (
                    <div className="flex items-center gap-2">
                        {task.owner === owner && (
                            <Button 
                                classNames="w-[60px] h-[60px] rounded-full bg-transparent text-2xl text-light-700 outline-2 outline-light-700 outline-dashed  hover:bg-transparent hover:outline-light-900 hover:text-light-900 dark:outline-dark-400 dark:text-dark-400 hover:dark:outline-dark-100 hover:dark:text-dark-100"
                                onClick={handleAddMembers}
                            >
                                +
                            </Button>
                        )}
                        {members.map((member, key) => ((task.owner === owner) ? key < 5 : key < 8) && (
                            <div 
                                key={`${member}-${key}`}
                                className="w-[60px] h-[60px]"
                            >
                                <Avatar id={member.userId} />
                            </div>
                        ))}
                        {members.length > 7 && `+${members.length - 7}`}
                    </div>
                )}
                <div className="flex justify-between">
                    <span className="flex items-center gap-2 font-semibold">
                        <Check
                            data-success={completedTask}
                            classNames="w-[30px] h-[30px] data-[success=true]:!bg-green-500"
                            onClick={() => setCompletedTask(!completedTask)}
                        />
                        Status
                    </span>
                    <Button
                        onClick={handleCompleteForm}
                        classNames="px-4"
                    >Pronto</Button>
                </div>
            </div>
        </div>
    );
}