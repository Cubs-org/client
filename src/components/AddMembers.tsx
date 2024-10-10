import { Button } from "./Button";
import { EditTask } from "./Calendar/EditItem";
import { IModal } from "../types/modal";
import { Task } from "../types/task";
import { useModal } from "../contexts/modalContext";

interface AddMembers {
    onClose: () => void;
    task?: Task;
}

export const AddMembers = ({ task, onClose }:AddMembers) => {
    // @ts-ignore
    const { openModal }:IModal = useModal()

    const handleAddNewMembers = () => {
        task?.membership?.push({userId:"rty"})
    }

    const handleAddMembers = () => {
        onClose();
        // @ts-ignore
        openModal({ content: <EditTask task={task} onClose={onClose} /> })
    }
    return (
        <div>
            <button onClick={handleAddNewMembers}>+++</button>
            <Button onClick={handleAddMembers}>Fim</Button>
        </div>
    );
}