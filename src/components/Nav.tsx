import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { links } from "../lib/navData";
import { FaAngleDown, FaBars, FaXmark } from "react-icons/fa6";
import { useState } from "react";

export const Nav = () => {

    const { pathname } = useLocation();

    const [mobileMenu, setMobileMenu] = useState(false);

    const toggleMobileMenu = () => setMobileMenu(!mobileMenu);

    return (
        <header className={clsx("w-full h-[10vh] flex items-center justify-between px-5", (
                (pathname === '/register' || pathname === '/login') ?
                "bg-purple-500 text-white" : "bg-white text-slate-900"
            ))}>
            <Link to={`/`} className={clsx(
                "flex flex-row items-center gap-2 font-black text-xl",
                (pathname === '/register' || pathname === '/login') ? "text-light-100" : "text-primary"
            )}>
                <Logo color={
                    (pathname === '/register' || pathname === '/login') ?
                    "light" : "default"
                } size={32}/>
                <span className="hidden md:flex">Cub's</span>
            </Link>
            <span className="absolute top-3 right-3 z-10 block md:hidden cursor-pointer" onClick={toggleMobileMenu}>
                {!mobileMenu ? <FaBars size={32} /> : <FaXmark size={32} />}
            </span>
            <nav className={clsx("absolute top-0 left-0 md:relative w-full h-full flex justify-center md:justify-end items-center transition-all duration-[1s]", {
                "bg-purple-500 text-white": (pathname === '/register' || pathname === '/login'),
                "bg-white text-slate-900": (pathname !== '/register' && pathname !== '/login'),
                "-translate-y-[calc(100vh*2)] md:translate-y-0 overflow-hidden h-0 md:overflow-visible md:h-fit": !mobileMenu,
                "translate-y-0 md:translate-y-0": mobileMenu
            })}>
                <ul className="w-4/5 md:w-fit flex flex-col md:flex-row items-center gap-3 text-base font-medium">
                    {links.map((link, key) => (
                        <li key={`${link}-${key}`} className="w-full md:w-fit flex items-center">
                            {link.child ? (
                                <div className="relative group w-full">
                                    <div className={clsx("md:flex items-center gap-1 py-[10px] hidden", {
                                        "!text-white md:text-purple-500": (pathname === '/register' || pathname === '/login'),
                                        "text-slate-500 md:text-slate-500": (pathname !== '/register' && pathname !== '/login')
                                    })}>
                                        <span>{link.name}</span>
                                        <FaAngleDown size={12} />
                                    </div>

                                    <ul className={clsx("relative md:absolute z-30 top-0 md:top-[42px] rounded-md w-full md:w-[300px] md:bg-white border-0 md:group-hover:border md:group-hover:border-purple-500 flex flex-col gap-2 md:shadow-md h-fit md:h-0 md:group-hover:!h-fit p-0 md:group-hover:p-2 overflow-hidden transition-all duration-75")}>
                                        {link.child.map((child, key) => (
                                            <li 
                                                key={`${child}-${key}`} 
                                                className={clsx("w-full md:px-3 py-1 text-sm px-0", {
                                                    "text-white md:text-purple-500": (pathname === '/register' || pathname === '/login'),
                                                    "text-slate-500 md:text-purple-500": (pathname !== '/register' && pathname !== '/login')
                                                })}
                                                onClick={toggleMobileMenu}
                                            >
                                                <h2 className="text-xl md:text-[1rem] font-bold my-[.5em] md:text-purple-500">{child.section}</h2>
                                                <ul className="flex flex-col gap-1">
                                                    {child.links.map((link, key) => (
                                                        <li key={`${link}-${key}`}>
                                                            <Link to={link.path} className="text-lg md:text-sm hover:opacity-70">{link.name}</Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <Link 
                                    to={link.path}
                                    className={
                                        clsx("text-lg md:text-base font-semibold", {
                                            "mt-[32px] md:mt-0": (key + 1) === links.length - 1
                                        }, (link.path === "/register" || link.path === "/login") ? (
                                            ((pathname === "/register" || pathname === "/login") ?
                                                "bg-white text-purple-500 px-[15px] py-[5px] rounded-md w-full md:w-fit text-center" :
                                                "bg-purple-500 text-white px-[15px] py-[5px] rounded-md w-full md:w-fit text-center"
                                            )
                                        ) : (pathname === "/register" || pathname === "/login") ?
                                            "text-white" :
                                            "text-slate-500"
                                        )
                                    }
                                    onClick={toggleMobileMenu}
                                >{link.name}</Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}