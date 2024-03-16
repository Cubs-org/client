import { useState } from "react";

import { ColorPicker } from "../ColorPicker";
import { Button } from "../Button";
// import { Avatar } from "../Avatar";
import { Check } from "../Check";
// import { Alert } from "../Alert";

import { Task } from "../../interfaces/task";
// import { AddMembers } from "../AddMembers";
import { DatePicker } from "../TimeControls/DatePicker";
import { useModal } from "../../contexts/modalContext";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../../lib/api";
// import { useUser } from "../../contexts/userContext";

interface TaskProps {
    task: Task;
    onUpdateAnyTask: (item: Task) => void;
    onItemDeleted: (item: Task) => void;
}

export const EditItem = ({ task, onUpdateAnyTask, onItemDeleted }:TaskProps) => {

    const socket = io(SOCKET_URL);
    // const {user} = useUser(); // add a ownerByUpdate

    const { closeModal } = useModal();
    let _task = task as any;
    const type = _task.properties.find((p) => p.type === "calendar").title;

    const properties = _task.properties;

    const [formData, setFormData] = useState({
        title: task.title,
        content: properties?.find((p) => p.type === "text").data.value,
        start: properties?.find((p) => p.type === "datetime").data.start,
        end: properties?.find((p) => p.type === "datetime").data.end,
        completed: properties?.find((p) => p.type === "checkbox").data.value,
        owner: _task.ownerId,
        color: properties?.find((p) => p.type === "calendar").data.color || "blue"
    });

    const formatDatetime = (datetime:string) => {
        let date = datetime.split(" ");
        return `${date[0]}T${date[1]}`;
    }

    const handleCompleteForm = () => {
        socket.emit("updateItem", {
            id: task.id,
            title: formData.title,
            content: formData.content,
            start: formData.start,
            end: formData.end,
            completed: formData.completed,
            owner: formData.owner,
            color: formData.color
        });

        socket.on("getCalendarItems", (req) => {
            // console.log("updateItem:", req);
            onUpdateAnyTask(req);
        });

        clean();
    }

    function clean() {
        closeModal();
        
        setFormData({
            title: "",
            content: "",
            start: "",
            end: "",
            completed: false,
            owner: "",
            color: "blue"
        });
    }

    // @ts-ignore
    // const { openModal, closeModal }:IModal = useModal();
    
    // const handleAddMembers = () => {
    //     let data = getAllFormData();
    //     // @ts-ignore
    //     openModal({content: <AddMembers task={data} onClose={closeModal} />})
    // }

    const handleSetColor = (color:string) => {
        setFormData({
            ...formData,
            color
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "completed") {
            let {checked} = e.target;
            setFormData({
                ...formData,
                [name]: checked
            });
            return;
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    }

    const handleDelete = () => {
        socket.emit("deleteItem", {id:task.id});
        onItemDeleted(task);
        clean();
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <h1 className="text-2xl font-black text-dark-600 dark:text-light-100">
                Editar {type === "task" ? "tarefa" : "evento"}
            </h1>
            <div className="flex flex-col w-full gap-3">
                <input 
                    className="bg-light-300 text-dark-400 placeholder-light-900 focus:outline-light-400 text-xl font-bold px-3 py-2 rounded-md outline-none border-0 focus:outline-2 dark:bg-dark-700 dark:placeholder-dark-100 dark:text-light-300 dark:focus:outline-dark-100"
                    type="text" 
                    placeholder="Título da tarefa ou evento"
                    value={formData.title}
                    name="title"
                    onChange={handleChange}
                />
                <textarea 
                    className="max-h-32 bg-light-300 text-dark-400 placeholder-light-900 focus:outline-light-400 text-base font-bold px-3 py-2 rounded-md outline-none border-0 focus:outline-2 dark:bg-dark-700 dark:placeholder-dark-100 dark:text-light-300 dark:focus:outline-dark-100 scrollbar scrollbar-thumb-dark-100 scrollbar-track-transparent"
                    placeholder="Descrição"
                    value={formData.content}
                    name="content"
                    onChange={handleChange}
                />
                {/* ColorPicker->select a color */}
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
                            value={formatDatetime(formData.start)} 
                            name="start"
                            handleChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                    <h3 className="text-base font-bold text-dark-500 dark:text-light-300">Fim</h3>
                        <DatePicker 
                            value={formatDatetime(formData.end)} 
                            name="end"
                            handleChange={handleChange}
                        />
                    </div>
                </div>
                {/* {task.membership && (
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
                )} */}
                <div className="flex justify-between">
                    <span className="flex items-center gap-2 font-semibold">
                        <Check
                            checked={formData.completed}
                            name="completed"
                            onChange={handleChange}
                            classNames="p-2"
                        />
                        Status
                    </span>
                    <div className="flex gap-2 items-center">
                        <Button
                            onClick={handleDelete}
                            classNames="px-4 bg-transparent hover:bg-red-500 ring-1 text-red-500 hover:text-light-300 ring-red-500"
                        >Apagar</Button>
                        <Button
                            onClick={handleCompleteForm}
                            classNames="px-4"
                        >Pronto</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}