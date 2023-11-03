import { useState } from "react";
import { Tooltip } from "./Tooltip";

import clsx from "clsx";

interface AvatarProps {
    id: string;
    classNames?: string;
    disableVisibleTooltip?: boolean;
};

export const Avatar = ({ id, classNames, disableVisibleTooltip }:AvatarProps) => {
    const [username, setUsername] = useState<string>("");
    const [img, setImg] = useState<string>("/src/assets/default-user.jpg");
    const [userFetched, setUserFetched] = useState(false);

    return (
        <Tooltip content={username} disableVisibleTooltip={disableVisibleTooltip}>
            <img 
                src={img} 
                alt={`avatar`}
                className={clsx("w-full h-auto rounded-full object-cover", classNames)}
            />
        </Tooltip>
    );
}