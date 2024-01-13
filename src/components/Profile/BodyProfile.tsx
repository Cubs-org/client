import { IUserAccount } from "../../interfaces/user";
import { Socket } from "socket.io-client";
import { Button } from "../Button";
import { Avatar } from "../Avatar";
import { formatDate, formatUserName } from "../../utils/profilePage";
import { FaImage } from "react-icons/fa6";
import { ChoiceUserImage } from "./ChoiceUserImage";
import { Popover } from "../Popover";
import { useState } from "react";

interface IBodyProfileProps {
    socket: Socket;
    userData: IUserAccount;
    setUserData: React.Dispatch<React.SetStateAction<IUserAccount>>;
}

export const BodyProfile = ({ socket, userData, setUserData }:IBodyProfileProps) => {

    const [userImageVisible, setUserImageVisible] = useState(false);

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

    return (
        <div className="w-full md:w-4/5 md:m-auto flex flex-col-reverse flex-grow gap-1 items-center md:flex-row">
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
                    icon={userData.icon as string}
                    name={username}
                    disableVisibleTooltip={true} 
                    classNames="hover:filter hover:brightness-125 hover:contrast-100 hover:saturate-150 transition-all duration-300 ease-in-out"
                />

                <Popover 
                    content={
                        <ChoiceUserImage 
                            socket={socket} 
                            userData={userData}
                            setUserData={setUserData}
                        />
                    }
                    direction="left"
                    show={userImageVisible}
                    isModal
                >
                    <Button 
                        classNames="text-xl md:text-3xl group-hover:scale-100 scale-0 absolute right-0 bottom-0 w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full shadow-full transition-all"
                        onClick={() => setUserImageVisible(!userImageVisible)}
                    ><FaImage />
                    </Button>
                </Popover>
            </div>
        </div>
    )
}