import clsx from "clsx";

import { Link } from "react-router-dom";

import { Avatar } from "../../Avatar";
import { Popover } from "../../Popover";
import { Badge } from "../../Badge";
import { Button } from "../../Button";

import { FaAngleLeft, FaBell, FaCommentDots } from "react-icons/fa6";

import minimizeText from "../../../utils/minimizeText";

export const Header = ({
    branch,
    members
}) => {
    return (
        <header className="flex justify-between items-center gap-1 border-b border-light-300 dark:border-dark-800 px-3 pb-2 md:p-0">
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
                                    {branch.map((page, index) => (
                                        <li
                                            key={`${page.id}-${index}`}
                                        >
                                            <Link
                                                to={`/page/${page.id}`}
                                                className="pr-2 p-1 flex items-center gap-2 hover:bg-light-300 dark:hover:bg-dark-700 rounded-md cursor-pointer"
                                            >
                                                <span>{page.icon}</span>
                                                {minimizeText(page.title, 40)}
                                            </Link>
                                        </li>
                                    ))}
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
                            {members.map((member, _i) => {
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
                            })}
                        </ul>
                    }
                >
                    <div className="flex items-center cursor-pointer">
                        <Avatar
                            icon="guaxinim" size={28}
                            classNames="ring ring-light-100 dark:ring-dark-900 rounded-full overflow-hidden"
                            isCircle
                            notDisplayUsername
                        />
                        <Avatar icon="zebra" size={28} classNames="ring ring-light-100 dark:ring-dark-900 rounded-full overflow-hidden -ml-1.5 isCircle" isCircle notDisplayUsername />
                        <Avatar icon="urso" size={28} classNames="ring ring-light-100 dark:ring-dark-900 rounded-full overflow-hidden -ml-1.5 isCircle" isCircle notDisplayUsername />
                    </div>
                </Popover>
            </div>
        </header>
    )
}