import { useEffect, useState } from "react"
import { Avatar } from "../Avatar"
import { IUser } from "../../interfaces/user";
import fetchAvatarImg from "../../utils/user/fetchAvatarImg";
import { formatDate, formatUserName } from "../../utils/profilePage";
import { SOCKET_URL } from "../../lib/api";
import { io } from "socket.io-client";
import { useAuth } from "../../contexts/authProvider";
import { jwtDecode } from "jwt-decode";
import getUser from "../../api/getUser";
import { Button } from "../Button";
import { FaImage } from "react-icons/fa6";

export const HeaderProfile = () => {

    const { token } = useAuth();

    const socket = io(SOCKET_URL);
    
    const [userData, setUserData] = useState<IUser>({
        id: "a1b2c3d4e5f6g7h8i9j0",
        name: "Usuário",
        email: "user@adress",
        icon: "/src/assets/default-user.jpg",
        createdAt: "00/00/0000",
        updatedAt: "00/00/0000"
    })
    const [userFetched, setUserFetched] = useState(false);

    const handleSetUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            name: e.target.value
        })
    }

    const handleSetUserData = () => {
        socket.emit("setUser", userData);
    }

    const username = userData?.name as string;
    const icon = fetchAvatarImg(userData?.icon) as string;

    useEffect(() => {

        if (!userFetched) {
            const userId = (jwtDecode(token as string) as any).user.id;

            getUser(userId).then(res => {
                setUserData(res.data.user);
                setUserFetched(true);
            });
        }

        socket.on("getUser", (user) => {
            setUserData(user);
        });
    }, [socket, userFetched]);

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
                        handleSetUserData()
                        e.target.value = formatUserName(userData.name)
                    }}
                />
                <span 
                    className="text-sm sm:text-base text-dark-300 font-medium dark:text-light-800"
                >Criado em {formatDate(userData.createdAt as string)}</span>
            </div>
            <div className="w-1/2 relative group ">
                <Avatar 
                    icon={icon}
                    name={username}
                    disableVisibleTooltip={true} 
                    classNames="hover:filter hover:brightness-125 hover:contrast-100 hover:saturate-150 transition-all duration-300 ease-in-out"
                />

                <Button classNames="group-hover:scale-100 scale-0 absolute right-0 bottom-0 w-[80px] h-[80px] rounded-full shadow-full transition-all">
                    <FaImage size={32}/>
                </Button>
            </div>
        </header>
    )
}