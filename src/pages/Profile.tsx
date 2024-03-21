import { FooterProfile } from "../components/Profile/FooterProfile";
import { HeaderProfile } from "../components/Profile/HeaderProfile";
import { useUser } from "../contexts/userContext";
import { Popover } from "../components/Popover";
import { ChoiceAnimalImage } from "../components/Profile/ChoiceAnimalImage";
import { Avatar } from "../components/Avatar";
import { formatDate, formatUserName } from "../utils/profilePage";
import { FaImage } from "react-icons/fa";
import { useEffect, useState } from "react";
// import { SocketContext } from "../contexts/socketContext";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../lib/api";

export default function Profile() {

    // const { socket } = useContext(SocketContext);
    const socket = io(SOCKET_URL, {
        transports: ["websocket"]
    });

    const { user, setUser } = useUser();

    const handleSetUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        let data = {
            ...user,
            name: e.target.value
        };

        setUser(data);
    }

    const handleChangeAvatar = (avatar: string) => {
        let data = {
            ...user,
            icon: avatar
        };

        handleSetUserData(data);
        setUser(data);
    }

    const handleSetUserData = (user) => {
        socket.connect();
        socket.emit("updateUser", user);

        socket.on("userUpdated", (data) => {
            setUser(data);
        });

        return () => {
            socket.off("userUpdated");
            // socket.disconnect();
        }
    };

    const username = user?.name as string,
        avatar = user?.icon as string;

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth <= 768);
    }, []);

    return (
        <div className="w-full h-full flex flex-col">
            {/* HeaderProfile */}
            <HeaderProfile user={user} />

            {/* BodyProfile */}
            <div className="w-full md:w-4/5 md:m-auto flex flex-col-reverse flex-grow gap-3 items-center md:flex-row">
                <div className="flex flex-col flex-grow items-center md:items-start w-4/5 md:w-full m-auto">
                    <h3 
                        className="text-base md:text-lg font-bold text-dark-400 bg-transparent dark:text-light-700"
                    >{user.email}</h3>
                    <input 
                        className="w-full rounded-md outline-none text-center md:text-left sm:text-6xl text-3xl font-bold text-dark-700 bg-transparent placeholder:text-light-300 dark:text-light-200 hover:bg-light-200 focus:outline-1 focus:ring-2 focus:ring-light-500 dark:hover:bg-dark-600 dark:focus:outline-1 dark:focus:ring-2 dark:focus:ring-dark-300 transition-all duration-300 ease-in-out" 
                        placeholder="Usuário"
                        value={username}
                        onChange={handleSetUserName}
                        onBlur={(e) => {
                            const data = {
                                ...user,
                                name: e.target.value
                            }
                            handleSetUserData(data)
                            e.target.value = formatUserName(username)
                        }}
                    />
                    <span 
                        className="text-sm sm:text-base text-dark-300 font-medium dark:text-light-800"
                    >Criado em {formatDate(user.createdAt as string)}</span>
                </div>

                <div className="w-1/2 static md:relative group py-3 md:py-2">
                    <Avatar 
                        icon={avatar}
                        name={username}
                        notDisplayUsername={true}
                        classNames="hover:filter hover:brightness-125 hover:contrast-100 hover:saturate-150 transition-all duration-300 ease-in-out"
                        isCircle
                    />

                    <div className="float-right -mt-[60px]">
                        <Popover 
                            content={
                                <ChoiceAnimalImage event={handleChangeAvatar} />
                            }
                            direction={isMobile ? "bottom-start" : "left"}
                        >
                            <span 
                                className="flex items-center justify-center bg-primary text-xl md:text-3xl group-hover:scale-100 scale-0 min-w-[60px] min-h-[60px] md:w-[80px] md:h-[80px] rounded-full shadow-full transition-all"
                            ><FaImage />
                            </span>
                        </Popover>
                    </div>
                </div>
                </div>

            {/* FooterProfile */}
            <FooterProfile />
        </div>
    )
}