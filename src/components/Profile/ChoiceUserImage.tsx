import { Socket } from "socket.io-client";
import { IUserAccount } from "../../interfaces/user";
import { Avatar } from "../Avatar";
import b from "../../lib/default_animal_images.json";

interface IChoiceUserImageProps {
    setUserData: React.Dispatch<React.SetStateAction<IUserAccount>>;
    userData: IUserAccount;
    socket: Socket;
}

export const ChoiceUserImage = ({ setUserData, userData, socket }: IChoiceUserImageProps) => {
    
    const bixos = b.animals as string[];

    const handleSetUserData = (bixo) => {
        setUserData({
            ...userData,
            icon: bixo
        })
        socket.emit("updateUser", {
            ...userData,
            icon: bixo
        })
    }

    return (
        <div className="w-[300px] px-3 py-2">
            <h3 className="text-lg font-bold text-dark-400 bg-transparent dark:text-light-700">Escolha seu bixo</h3>
            <div className="flex flex-wrap justify-center items-center gap-2">
                {bixos.map((bixo, index) => (
                    <div 
                        key={index}
                        className="w-12 h-12 rounded-full bg-light-200 dark:bg-dark-600 cursor-pointer hover:filter hover:brightness-125 hover:contrast-100 hover:saturate-150 transition-all duration-300 ease-in-out"
                        onClick={() => handleSetUserData(bixo)}
                    >
                        <Avatar icon={bixo} disableVisibleTooltip />
                    </div>
                ))}
            </div>
        </div>
    )
}