import properties from "../../../../lib/page_properties";
import { renderIcon } from "../../Page/renderProperties";
import { useUser } from "../../../../contexts/userContext";
import { useSocket } from "../../../../contexts/socketContext";

export const NewColumn = () => {

    const { user: { hubId} } = useUser();
    const { listener } = useSocket();

    const handleSubmit = (type:string) => {
        if (listener) {
            listener.emit('request:createHubNewProperty', {
                datahubId: hubId,
                type: type
            });
        }
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