import { io } from "socket.io-client";
import properties from "../../../lib/page_properties";
import { renderIcon } from "../../Page/renderProperties";
import { SOCKET_URL } from "../../../lib/api";

interface BtnNewColumnProps {
    datahubId: string;
};

export const NewColumn = ({ datahubId }:BtnNewColumnProps) => {

    const socket = io(SOCKET_URL, {
        transports: ['websocket']
    });

    const handleSubmit = (type:string) => {
        
        socket.emit('createColumn', {
            datahubId: datahubId,
            type: type
        });
        // console.log("Btn::", type, datahubId);
    }

    return (
        <div className="max-h-[300px] overflow-y-scroll scrollbar scrollbar-thumb-light-300 dark:scrollbar-thumb-dark-700 scrollbar-track-transparent">
            <div className="flex justify-between items-center border-b border-dark-100">
                <h3 className="text-left text-sm pl-2 py-1">Selecione a propriedade:</h3>
            </div>

            <ul className="w-[200px] flex flex-col gap-0.5 items-start px-0.5 mt-1">
                {properties.map((property, index) => {
                    return (
                        <li 
                            key={index} 
                            onClick={() => handleSubmit(property.type)}
                            className="w-full flex flex-row items-center gap-2 text-sm hover:bg-light-300 dark:hover:bg-dark-700 rounded-md p-1 cursor-pointer"
                        >
                            {renderIcon(property.icon)}
                            <span>{property.title}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}