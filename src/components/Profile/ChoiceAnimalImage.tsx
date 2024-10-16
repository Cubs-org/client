import { Avatar } from "../Avatar";
import b from "../../lib/default_animal_images.json";

interface IChoiceUserImageProps {
    event: (bixo: string) => void;
}

export const ChoiceAnimalImage = ({ event }: IChoiceUserImageProps) => {
    
    const bixos = b.animals as string[];

    return (
        <div className="w-[300px] px-3 py-2">
            <h3 className="text-lg font-bold text-dark-400 bg-transparent dark:text-light-700">Escolha seu bixo</h3>
            <div className="flex flex-wrap justify-center items-center gap-2">
                {bixos.map((bixo, index) => (
                    <div 
                        key={index}
                        className="w-12 h-12 rounded-full bg-light-200 dark:bg-dark-600 cursor-pointer hover:filter hover:brightness-125 hover:contrast-100 hover:saturate-150 transition-all duration-300 ease-in-out"
                        onClick={() => event(bixo)}
                    >
                        <Avatar icon={bixo} notDisplayUsername />
                    </div>
                ))}
            </div>
        </div>
    )
}