import { useState } from "react";

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
// import { jwtDecode } from "jwt-decode";
// import { useAuth } from "../../../contexts/authProvider";
// import getUser from "../../../api/getUser";
import Logo from "../../Logo";
import { useUser } from "../../../contexts/userContext";

interface ISidebar {
    layout: boolean;
    handleSetLayout: () => void;
}

export const Sidebar = ({ layout, handleSetLayout }: ISidebar) => {

    const { user } = useUser();

    // const { token } = useAuth();
    // const [userFetched, setUserFetched] = useState(false);

    const userName = user?.data?.name as string || "Usuário",
        userIcon = user?.data?.icon as string || "/src/assets/default-user.jpg"

    const { pathname } = useLocation();

    const [sidebarVisibility, setSidebarVisibility] = useState(false);

    const menu_option_default = "w-full lg:w-[60px] lg:h-[60px] px-3 py-2 font-bold text-dark-600 rounded-md cursor-pointer flex justify-start items-center lg:justify-center gap-3 hover:text-light-300 hover:bg-purple-500 hover:shadow-menu dark:text-light-600"

    const pages = [
        {
            name: "Início",
            icon: <FaNetworkWired size={20} />,
            link: "/"
        },
        {
            name: "Agenda",
            icon: <FaCalendar size={20} />,
            link: "/calendar"
        },
        {
            name: "Metas",
            icon: <FaChartBar size={20} />,
            link: "/goals"
        }
    ]

    const handleSidebarVisibility = () => {
        setSidebarVisibility(!sidebarVisibility)
    }

    const handleClickUser = () => {
        window.location.href = "/profile"
    }

    // useEffect(() => {

    //     if (!userFetched) {
    //         const userId = (jwtDecode(token as string) as any).user.id;

    //         getUser(userId)
    //             .then(res => {
    //                 setUser({ data: res.data, hubId: user?.hubId});
    //                 setUserFetched(true);
    //             });
    //     }
    // }, [userFetched]);

    return (
        <>
            <div className="relative w-full p-3 z-[45] flex justify-between lg:hidden bg-light-100 dark:bg-dark-900">
                <button
                    className="text-dark-600 dark:text-light-300 hover:text-dark-700 dark:hover:text-light-200 transition-all delay-75 duration-150"
                    onClick={handleSidebarVisibility}
                >
                    {!sidebarVisibility ? <FaBars size={32} /> : <FaAngleDoubleLeft size={32} />}
                </button>
                <span className={clsx({
                    "hidden": sidebarVisibility,
                    "flex": !sidebarVisibility,
                })}>
                    <Avatar
                        icon={userIcon as string || "/src/assets/default-user.jpg"}
                        size={32}
                        notDisplayUsername={true}
                        isCircle
                    />
                </span>
            </div>
            <div className={clsx("absolute lg:relative w-full min-h-screen lg:w-[80px] lg:min-w-[80px] lg:min-h-[95vh] lg:max-h-[90vh] flex z-40 flex-col justify-evenly lg:justify-between items-center gap-0 lg:gap-3 lg:rounded-2xl px-3 py-2 bg-light-100 dark:bg-dark-900 transition-all border border-light-700 dark:lg:border-dark-700", {
                // "lg:absolute lg:-translate-x-[80px]" : !layout,
                "lg:-ml-[80px]": !layout,
                "lg:translate-x-0 -translate-x-[100vw]": !sidebarVisibility,
                "lg:translate-x-0 translate-x-0": sidebarVisibility,
            })}>
                <Button
                    classNames="w-[30px] h-[30px] rounded-full absolute top-7 -right-[15px] hidden lg:flex shadow-full"
                    onClick={handleSetLayout}>
                    <FaAngleDoubleLeft size={24} className={clsx("transition-all delay-75 duration-150", {
                        "transform rotate-180": !layout,
                    })} />
                </Button>
                <div className="w-full flex flex-col items-center gap-2">
                    <div className="w-3/5 mb-8 lg:mb-3 lg:w-[60px] lg:h-[60px] lg:mt-4 flex items-center flex-row gap-3 text-purple-500">
                        <Logo size={32} className="lg:min-w-full fill-purple-500" />
                        <span className="block lg:hidden text-3xl font-extrabold text-primary">Cub's</span>
                    </div>
                    <hr className="w-full border-1 border-light-300 dark:border-dark-700 hidden lg:block" />
                    <div className="w-3/5 h-full lg:w-full flex flex-col lg:items-center gap-2">
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
                </div>

                <div className="w-3/5 lg:w-full flex flex-col gap-2 items-center">
                    <hr className="w-full border-1 border-light-300 dark:border-dark-700 hidden lg:block" />
                    <ThemeSwitcher classNames={twMerge(menu_option_default)}>
                        <span className="block lg:hidden">Tema</span>
                    </ThemeSwitcher>
                    <div className={menu_option_default}>

                        <div className="flex justify-start items-center lg:hidden w-full gap-3">
                            <Avatar icon={userIcon as string} name={userName} size={24} isCircle />
                            <span className="block lg:hidden" onClick={handleClickUser}>{userName}</span>
                        </div>

                        <Popover
                            content={<UserSettings />}
                            direction="right-start"
                            width="100%"
                            offset={30}
                            classNames="w-full place-items-center hidden lg:grid"
                        >
                            <Avatar icon={userIcon as string} name={userName} size={24} isCircle />
                            <span className="block lg:hidden" onClick={handleClickUser}>{userName}</span>
                        </Popover>
                    </div>
                </div>
            </div>
        </>
    )
}