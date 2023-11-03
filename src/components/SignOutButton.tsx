import React from "react"
import { IModal } from "../interfaces/modal"
import { useModal } from "../contexts/modalContext"
import { Button } from "./Button"

interface SignOutButtonProps {
    classNames?: string
    children: React.ReactNode
}

const AlertSignOut = () => {
    return (
        <div className="w-full h-full flex flex-col gap-6">
            <h3 className="text-xl font-bold text-dark-600 dark:text-light-300">Você tem certeza que deseja sair?</h3>
            <div className="flex items-center justify-end gap-3">
                <Button
                    classNames="bg-red-400 text-light-200 px-4 hover:bg-red-500"
                >Sair</Button>
                <Button 
                    // onClick={() => closeModal && closeModal()} 
                    classNames="bg-transparent hover:bg-light-600 text-dark-100 dark:hover:bg-dark-300 dark:text-light-200"
                >Cancelar</Button>
            </div>
        </div>
    )
}

export const SignOutButton = ({ children, classNames }:SignOutButtonProps) => {
    // @ts-ignore
    const { openModal }:IModal = useModal();
    
    return (
        <>
            <button 
                className={classNames} 
                onClick={() => openModal && openModal({
                        content: <AlertSignOut/>,
                        visible: true
                })}
            >{children}</button>
        </>
    )
}