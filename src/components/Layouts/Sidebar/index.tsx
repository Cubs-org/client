import { useEffect, useState } from "react";

import clsx from "clsx";

import { twMerge } from "tailwind-merge";

import { Avatar } from "../../Avatar";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "../../Button";
import { Popover } from "../../Popover";
import { UserSettings } from "./UserSettings";

import { 
    FaAngleDoubleLeft, 
    FaBars, 
    FaCalendar, 
    FaChartBar,
    FaNetworkWired 
} from "react-icons/fa";
import { Tooltip } from "../../Tooltip";
import { useLocation } from "react-router-dom";
import { IUser } from "../../../interfaces/user";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../../contexts/authProvider";
import getUser from "../../../api/getUser";
import Logo from "../../Logo";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../../../lib/api";

interface ISidebar {
    layout: boolean;
    handleSetLayout: () => void;
}

export const Sidebar = ({ layout, handleSetLayout }:ISidebar) => {

    const { token } = useAuth();
    const socket = io(SOCKET_URL, {
        transports: ["websocket"]
    });

    const [userData, setUserData] = useState<IUser>();
    const [userFetched, setUserFetched] = useState(false);

    const username = userData?.name;

    const { pathname } = useLocation();

    const [sidebarVisibility, setSidebarVisibility] = useState(false);

    const menu_option_default = "w-full lg:w-[60px] lg:h-[60px] px-3 py-2 font-bold text-dark-600 rounded-md cursor-pointer flex justify-start items-center lg:justify-center gap-3 hover:text-light-300 hover:bg-purple-500 hover:shadow-menu dark:text-light-600"

    const pages = [
        {
            name: "Início",
            icon: <FaNetworkWired size={20}/>,
            link: "/"
        },
        {
            name: "Agenda",
            icon: <FaCalendar size={20}/>,
            link: "/calendar"
        },
        {
            name: "Metas",
            icon: <FaChartBar size={20}/>,
            link: "/goals"
        }
    ]

    const handleSidebarVisibility = () => {
        setSidebarVisibility(!sidebarVisibility)
    }

    const handleClickUser = () => {
        window.location.href = "/profile"
    }

    useEffect(() => {

        if (!userFetched) {
            const userId = (jwtDecode(token as string) as any).user.id;


            getUser(userId).then(res => {
                setUserData(res.data.user);
                setUserFetched(true);
            });
        }

        if (socket) {
            socket.connect();
            socket.on("updateUser", (user) => {
                setUserData(user);
            });
        }

        return () => {
            if (socket) socket.off("updateUser");
        }
    }, [socket, userFetched]);

    return (
        <>
            <div className="relative w-full p-3 z-[45] flex justify-between lg:hidden bg-light-100 dark:bg-dark-900">
                <button 
                    className="text-dark-600 dark:text-light-300 hover:text-dark-700 dark:hover:text-light-200 transition-all delay-75 duration-150"
                    onClick={handleSidebarVisibility}
                >
                    {!sidebarVisibility ? <FaBars size={32}/> : <FaAngleDoubleLeft size={32}/> }
                </button>
                <span className={clsx({
                    "hidden" : sidebarVisibility,
                    "flex" : !sidebarVisibility,
                })}>
                    <Avatar 
                        icon={userData?.icon as string} 
                        size={32}
                        notDisplayUsername={true}
                        isCircle
                    />
                </span>
            </div>
            <div className={clsx("absolute top-0 w-full h-screen rounded-none lg:w-[80px] flex z-40 lg:min-h-[90vh] lg:max-h-[90vh] flex-col justify-evenly lg:justify-between items-center gap-0 lg:gap-3 lg:shadow-full lg:rounded-2xl px-3 py-2 bg-light-100 dark:bg-dark-900 transition-all", {
                "lg:-left-[100px]" : !layout,
                "lg:translate-x-0 -translate-x-[100vw]" : !sidebarVisibility,
                "lg:translate-x-0 translate-x-0" : sidebarVisibility,
            })}>
                <Button 
                    classNames="w-[30px] h-[30px] rounded-full absolute top-7 -right-[15px] hidden lg:flex shadow-full"
                    onClick={handleSetLayout}>
                    <FaAngleDoubleLeft size={24} className={clsx("transition-all delay-75 duration-150", {
                        "transform rotate-180" : !layout,
                    })}/>
                </Button>
                <div className="w-3/5 mt-0 lg:w-[40px] lg:h-[40px] lg:mt-4 flex flex-row items-center gap-3">
                    <Logo size={32} className="md:min-w-full" />
                    <span className="block lg:hidden text-3xl font-extrabold text-primary">Cub's</span>
                </div>
                <hr className="w-full border-1 border-light-900 dark:border-dark-100 hidden lg:block"/>
                <div className="w-3/5 lg:w-full flex flex-col gap-2">
                    {pages.map((page, index) => (
                        <Tooltip 
                            content={page.name}
                            key={`${index}-${page.name}`}>
                            <a href={page.link}>
                                <div className={clsx(menu_option_default, {
                                    "!text-purple-500 hover:!text-light-300 w-full": page.link == pathname,
                                })}>
                                    {page.icon}
                                    <span className="block lg:hidden">{page.name}</span>
                                </div>
                            </a>
                        </Tooltip>
                    ))}
                </div>
                <hr className="w-full border-1 border-light-900 dark:border-dark-100 hidden lg:block"/>
                <div className="w-3/5 lg:w-full flex flex-col gap-2">
                    <ThemeSwitcher classNames={twMerge(menu_option_default)}>
                        <span className="block lg:hidden">Tema</span>
                    </ThemeSwitcher>
                    <div className={menu_option_default}>
                        
                        <div className="flex justify-start items-center lg:hidden w-full gap-3">
                            <Avatar icon={userData?.icon as string} name={username} size={24} isCircle />
                            <span className="block lg:hidden" onClick={handleClickUser}>{username}</span>
                        </div>

                        <Popover 
                            content={<UserSettings />} 
                            direction="right"
                            width="100%"
                            offset={30}
                            classNames="w-full place-items-center hidden lg:grid"
                        >
                            <Avatar icon={userData?.icon as string} name={username} size={24} isCircle />
                            <span className="block lg:hidden" onClick={handleClickUser}>{username}</span>
                        </Popover>
                    </div>
                </div>
            </div>
        </>
    )
}