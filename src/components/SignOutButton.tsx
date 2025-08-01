import React from "react"
import { IModal } from "../types/modal"
import { useModal } from "../contexts/modalContext"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/authProvider"

interface SignOutButtonProps {
    classNames?: string
    children: React.ReactNode
}

const AlertSignOut = () => {
    // @ts-ignore
    const { modalState:{ visible, content }, openModal, closeModal } = useModal();

    const { signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOut();
        closeModal && closeModal();
        navigate("/login");
    }

    return (
        <div className="w-full h-full flex flex-col gap-6">
            <h3 className="text-xl font-bold text-dark-600 dark:text-light-300">Você tem certeza que deseja sair?</h3>
            <div className="flex items-center justify-end gap-3">
                <Button
                    classNames="bg-red-400 text-light-200 px-4 hover:bg-red-500"
                    onClick={handleSignOut}
                >Sair</Button>
                <Button 
                    onClick={() => closeModal && closeModal()} 
                    classNames="bg-transparent hover:bg-light-600 text-dark-100 dark:hover:bg-dark-300 dark:text-light-200"
                >Cancelar</Button>
            </div>
        </div>
    )
}

export const SignOutButton = ({ children, classNames }:SignOutButtonProps) => {
    const { openModal }:IModal = useModal();
    
    return (
        <>
            <button 
                className={classNames} 
                onClick={() => openModal && openModal({
                        content: <AlertSignOut/>
                })}
            >{children}</button>
        </>
    )
}