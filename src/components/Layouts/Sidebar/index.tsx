import { useEffect, useState } from "react";

import clsx from "clsx";

import { twMerge } from "tailwind-merge";

import { Avatar } from "../../Avatar";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "../../Button";
import { Popover } from "../../Popover";
import { UserSettings } from "./UserSettings";


import axios from "axios";

import { 
    FaAngleDoubleLeft, 
    FaBars, 
    FaCalendar, 
    FaChartBar, 
    FaMoon, 
    FaNetworkWired 
} from "react-icons/fa";
import { Tooltip } from "../../Tooltip";
import { FaSun } from "react-icons/fa6";

interface ISidebar {
    layout: boolean;
    handleSetLayout: () => void;
}

export const Sidebar = ({ layout, handleSetLayout }:ISidebar) => {
    const [username, setUsername] = useState("usuário")
    const pathname = window.location.pathname

    const [idUser, setIdUser] = useState("")
    const [sidebarVisibility, setSidebarVisibility] = useState(false);
    const [userFetched, setUserFetched] = useState(false);

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

    return (
        <>
            <div className="relative w-full p-3 z-[45] flex justify-between lg:hidden bg-light-100 dark:bg-dark-800">
                <button 
                    className="text-dark-600 dark:text-light-300 hover:text-dark-700 dark:hover:text-light-200 transition-all delay-75 duration-150"
                    onClick={handleSidebarVisibility}
                >
                    <FaBars size={32}/>
                </button>
                <span className={clsx({
                    "hidden" : sidebarVisibility,
                    "flex" : !sidebarVisibility,
                })}>
                    <div className="w-8 h-8">
                        <Avatar id={idUser}/>
                    </div>
                </span>
            </div>
            <div className={clsx("absolute top-0 w-full h-full lg:w-[80px] z-40 lg:min-h-[90vh] lg:max-h-[90vh] flex-col justify-evenly lg:justify-between items-center gap-0 lg:gap-3 lg:shadow-full rounded-2xl px-3 py-2 bg-light-100 dark:bg-dark-800", {
                "lg:-left-[100px]" : !layout,
                "lg:!flex hidden" : !sidebarVisibility,
                "lg:!flex flex" : sidebarVisibility,
            })}>
                <Button 
                    classNames="w-[30px] h-[30px] rounded-full absolute top-7 -right-[15px] hidden lg:flex shadow-full"
                    onClick={handleSetLayout}>
                    <FaAngleDoubleLeft size={24} className={clsx("transition-all delay-75 duration-150", {
                        "transform rotate-180" : !layout,
                    })}/>
                </Button>
                <div className="w-3/5 mt-0 lg:w-[40px] lg:h-[40px] lg:mt-4 flex flex-row items-center gap-3">
                    <img
                        src="src/assets/cubs.svg" 
                        alt="logo" 
                        className="w-[60px] lg:w-full lg:h-full object-contain"
                    />
                    <span className="block lg:hidden text-3xl font-extrabold text-purple-400">Cub's</span>
                </div>
                <hr className="w-full border-1 border-light-900 dark:border-dark-100 hidden lg:block"/>
                <div className="w-3/5 lg:w-full flex flex-col gap-2">
                    {pages.map((page, index) => (
                        <Tooltip 
                            content={page.name}
                            key={`${index}-${page.name}`}>
                            <a href={page.link}>
                                <div className={clsx(menu_option_default, {
                                    "!text-purple-500 hover:!text-light-300": page.link == pathname,
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
                    <Popover content={<UserSettings />} direction="right">
                        <div className={twMerge(menu_option_default)}>
                            <div className="w-6 h-6">
                                <Avatar id={idUser}/>
                            </div>
                            <span className="block lg:hidden">{username}</span>
                        </div>
                    </Popover>
                </div>
            </div>
        </>
    )
}