import React from "react";
import clsx from "clsx";

import { Link, useLocation } from "react-router-dom";

import { Avatar } from "../../../components/Avatar";
import { Popover } from "../../../components/Popover";
import { Badge } from "../../../components/Badge";
import { Button } from "../../../components/Button";

import { FaAngleLeft, FaBell, FaCommentDots, FaUserPlus } from "react-icons/fa6";

import minimizeText from "../../../utils/minimizeText";
import { ChangeAction, PageData } from "../../../interfaces/page";

interface HeaderPageProps {
    currentPage: PageData,
    setPageData: React.Dispatch<ChangeAction>,
    branch: PageData[],
    members: {
        name: string;
        icon: string;
        email: string;
    }[];
}

export const Header = ({
    branch,
    members,
    setPageData
}:HeaderPageProps) => {
    
    const { pathname } = useLocation();
    const pageId = pathname.split("/").pop();

    return (
        <header className="flex justify-between items-center gap-1 border-b border-light-300 dark:border-dark-800 pb-2 lg:pb-1">
            <section className="flex gap-2 md:gap-3 items-center">
                <nav
                    className="hidden md:flex items-center gap-0.5 text-sm"
                >
                    {branch.length > 3 && (
                        <Popover
                            direction="bottom-end"
                            classNames="font-normal"
                            content={
                                <ul className="p-1">
                                    {branch.map((page, index) => {
                                        const prev_branch = branch.slice(0, index);

                                        return (
                                            <li
                                                key={`${page.id}-${index}`}
                                            >
                                                <Link
                                                    to={`/page/${page.id}`}
                                                    onClick={() => {
                                                        // @ts-ignore
                                                        setPageData({type: "icon", payload: page.data.icon});
                                                        // @ts-ignore
                                                        setPageData({type: "title", payload: page.title});
                                                    }}
                                                    className={clsx("pr-2 p-1 flex items-center gap-1", {
                                                        "text-light-900 dark:text-dark-100 underline": (pageId === page.id),
                                                        "hover:bg-light-300 dark:hover:bg-dark-700 rounded-md cursor-pointer": (pageId !== page.id)
                                                    
                                                    })}
                                                >
                                                    <div
                                                        style={{
                                                            marginLeft: `${(prev_branch.length)}rem`
                                                        }}
                                                        className="text-xs"
                                                    >└─ </div>
                                                    {minimizeText(page.title, 40)}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            }
                        >.. /</Popover>
                    )}

                    {branch.map((page, index) => {

                        const _length: number = branch.length,
                            _limit: boolean = ([_length, (_length - 1)].includes(index + 1));

                        return (
                            <div key={page.id} className="flex items-center gap-1">
                                {_limit && (
                                    <Link
                                        to={`/page/${page.id}`}
                                        onClick={() => {
                                            // @ts-ignore
                                            setPageData({type: "icon", payload: page.data.icon});
                                            // @ts-ignore
                                            setPageData({type: "title", payload: page.title});
                                        }}
                                        className={clsx("font-normal px-1 py-0.5 rounded-md", {
                                            "hover:bg-light-300 dark:hover:bg-dark-700 cursor-pointer": (index < (branch.length - 1))
                                        })}
                                    >{minimizeText(page.title, 15)}</Link>
                                )}
                                {_limit && (index < _length - 1) && "/"}
                            </div>
                        )
                    })}
                </nav>

                <span
                    className="w-8 h-8 flex md:hidden items-center justify-center rounded-full cursor-pointer bg-light-300 dark:bg-dark-700 text-light-900 dark:text-dark-100"
                ><FaAngleLeft /></span>

                <span className="font-semibold text-sm text-light-900 dark:text-dark-100">Editado há 2 dias atrás</span>
            </section>

            <div className="flex items-center gap-3">

                <Badge content={101}>
                    <Button
                        classNames="bg-transparent text-dark-700 dark:text-light-300 text-xl md:text-2xl rounded-md group-hover:bg-light-300 dark:group-hover:bg-dark-700 p-2 cursor-pointer"
                    >
                        <FaBell />
                    </Button>
                </Badge>
                <Badge content={20}>
                    <Button
                        classNames="bg-transparent text-dark-700 dark:text-light-300 text-xl md:text-2xl rounded-md group-hover:bg-light-300 dark:group-hover:bg-dark-700 p-2 cursor-pointer"
                    >
                        <FaCommentDots />
                    </Button>
                </Badge>

                {/* Members */}
                <Popover
                    direction="bottom-start"
                    content={
                        <ul className="min-w-[300px] flex flex-col gap-1 p-1">
                            {members.length > 0 ? members.map((member, _i) => {
                                return (
                                    <li
                                        key={`${member}-${_i}`}
                                        className="w-full flex justify-between items-center px-1 py-0.5 rounded-md cursor-pointer hover:bg-light-500 dark:hover:bg-dark-500"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Avatar icon={member.icon} size={24} classNames="border-2 border-purple-500 border-separate rounded-full" isCircle />
                                            <span className="text-sm font-medium">{member.name}</span>
                                        </div>
                                        <span className="ml-4 text-xs text-light-900">{member.email}</span>
                                    </li>
                                )
                            }) : <div className="min-h-[100px] grid place-items-center">Nenhum membro adicionado ainda.</div>}

                            <Button classNames="w-full py-1 mt-3">Novo membro</Button>
                        </ul>
                    }
                >
                    <div className="flex items-center cursor-pointer">
                        {members.length > 0 ? members.map((member, _i) => {
                            return (
                                <Avatar
                                    key={`${member}-${_i}`}
                                    icon={member.icon}
                                    size={28}
                                    classNames={clsx("ring ring-light-100 dark:ring-dark-900 rounded-full overflow-hidden", {
                                        "-ml-1": (_i > 0)
                                    })}
                                    isCircle
                                    notDisplayUsername
                                />
                            )
                        }) : 
                        <span
                            className="bg-transparent text-dark-700 dark:text-light-300 text-xl md:text-2xl rounded-md hover:bg-light-300 dark:hover:bg-dark-700 p-2 cursor-pointer"
                        ><FaUserPlus /></span>}
                    </div>
                </Popover>
            </div>
        </header>
    )
}