import { Tooltip } from "./Tooltip";

import clsx from "clsx";

interface AvatarProps {
    classNames?: string;
    disableVisibleTooltip?: boolean;

    name?: string;
    icon: string;
};

export const Avatar = ({ name, icon, classNames, disableVisibleTooltip }:AvatarProps) => {

    const username = name?.split(" ")[0] || "Usuário";
    const pic = icon || "/src/assets/default-user.jpg";

    return (
        <Tooltip content={username} disableVisibleTooltip={disableVisibleTooltip}>
            <img 
                src={pic} 
                alt={`avatar`}
                className={clsx("w-full h-auto rounded-full object-cover", classNames)}
            />
        </Tooltip>
    );
}