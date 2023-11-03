import { useEffect, useState } from "react"
import { Avatar } from "../Avatar"

import axios from "axios"

interface IUser {
    id: string;
    name: string;
    email: string;
    icon: string;
    createdAt: string;
    updatedAt: string;
}


export const HeaderProfile = () => {
    const [userData, setUserData] = useState<IUser>({
        id: "",
        name: "",
        email: "",
        icon: "",
        createdAt: "",
        updatedAt: ""
    })
    const [userFetched, setUserFetched] = useState(false);

    const padDate = (date: number) => String(date).padStart(2, '0')

    const formatDate = (date: string) => {
        const d = new Date(date)
        return `${padDate(d.getDate())}/${padDate(d.getMonth() + 1)}/${d.getFullYear()}`
    }

    const formatUserName = (name: string) => {
        return name.length > 16 ? `${name.slice(0, 16)}...` : name
    }

    const handleSetUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            name: e.target.value
        })
    }

    return (
        <header className="w-full h-full flex justify-between items-center gap-3">
            <div className="flex flex-col">
                <h3 
                    className="text-lg font-bold text-dark-400 bg-transparent dark:text-light-700"
                >{userData.email}</h3>
                <input 
                    className="w-full rounded-md outline-none text-6xl font-bold text-dark-700 bg-transparent placeholder:text-light-300 dark:text-light-200 hover:bg-light-200 focus:outline-1 focus:ring-2 focus:ring-light-500 dark:hover:bg-dark-600 dark:focus:outline-1 dark:focus:ring-2 dark:focus:ring-dark-300 transition-all duration-300 ease-in-out" 
                    placeholder="Usuário"
                    value={userData.name}
                    onChange={handleSetUserName}
                    onBlur={e => {
                        handleSetUserName(e)
                        e.target.value = formatUserName(userData.name)
                    }}
                />
                <span 
                    className="text-dark-300 font-medium dark:text-light-800"
                >Criado em {formatDate(userData.createdAt)}</span>
            </div>
            <div className="w-1/2">
                <Avatar 
                    id={userData.id} 
                    disableVisibleTooltip={true} 
                    classNames="hover:filter hover:brightness-125 hover:contrast-100 hover:saturate-150 transition-all duration-300 ease-in-out"
                />
            </div>
        </header>
    )
}