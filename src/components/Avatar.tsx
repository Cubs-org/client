import { formatUserName } from "../utils/profilePage";
import fetchAvatarImg from "../utils/user/fetchAvatarImg";
import { Tooltip } from "./Tooltip";

import clsx from "clsx";

interface AvatarProps {
    classNames?: string;
    disableVisibleTooltip?: boolean;
    isCircle?: boolean;

    name?: string;
    icon: string;
    size?: number;
};

export const Avatar = ({ name, icon, classNames, disableVisibleTooltip, isCircle, size }:AvatarProps) => {

    const username = name && formatUserName(name) || "Usuário";

    const { image, isAnimal } = fetchAvatarImg(icon);
    const pic = image || "/src/assets/default-user.jpg";

    return (
        <Tooltip content={username} disableVisibleTooltip={disableVisibleTooltip}>
            <img 
                src={pic} 
                alt={`avatar`}
                // width={`${size}px`}
                // height={`${size}px`}
                style={{
                    width: size ? `${size}px` : "100%",
                    height: size ? `${size}px` : "100%",
                }}
                className={clsx("object-cover", classNames, {
                    "rounded-full": (isCircle && !isAnimal),
                })}
                referrerPolicy="no-referrer"
            />
        </Tooltip>
    );
}