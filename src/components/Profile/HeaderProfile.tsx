import { useEffect, useState } from "react"
import { Avatar } from "../Avatar"
import { IUser } from "../../interfaces/user";
import fetchAvatarImg from "../../utils/user/fetchAvatarImg";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../contexts/authProvider";


export const HeaderProfile = () => {

    const { token } = useAuth();
    
    const [userData, setUserData] = useState<IUser>({
        id: "a1b2c3d4e5f6g7h8i9j0",
        name: "Usuário",
        email: "user@adress",
        icon: "/src/assets/default-user.jpg",
        createdAt: "00/00/0000",
        updatedAt: "00/00/0000"
    })

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

    const username = userData?.name as string;
    const icon = fetchAvatarImg(userData?.icon) as string;

    const [userLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        if (!userLoaded) {
            let user
            user = (jwtDecode(token as string));
            user = user.user;
            setUserData(user as IUser);
            console.log(user);
            setUserLoaded(true);
        }
    }, [userLoaded]);

    return (
        <header className="w-full h-full flex flex-col-reverse sm:flex-row justify-evenly sm:justify-between items-center gap-1 sm:gap-3">
            <div className="flex flex-col">
                <h3 
                    className="text-lg font-bold text-dark-400 bg-transparent dark:text-light-700"
                >{userData.email}</h3>
                <input 
                    className="w-full rounded-md outline-none sm:text-6xl text-3xl font-bold text-dark-700 bg-transparent placeholder:text-light-300 dark:text-light-200 hover:bg-light-200 focus:outline-1 focus:ring-2 focus:ring-light-500 dark:hover:bg-dark-600 dark:focus:outline-1 dark:focus:ring-2 dark:focus:ring-dark-300 transition-all duration-300 ease-in-out" 
                    placeholder="Usuário"
                    value={userData.name}
                    onChange={handleSetUserName}
                    onBlur={e => {
                        handleSetUserName(e)
                        e.target.value = formatUserName(userData.name)
                    }}
                />
                <span 
                    className="text-sm sm:text-base text-dark-300 font-medium dark:text-light-800"
                >Criado em {formatDate(userData.createdAt as string)}</span>
            </div>
            <div className="w-1/2">
                <Avatar 
                    icon={icon}
                    name={username}
                    disableVisibleTooltip={true} 
                    classNames="hover:filter hover:brightness-125 hover:contrast-100 hover:saturate-150 transition-all duration-300 ease-in-out"
                />
            </div>
        </header>
    )
}