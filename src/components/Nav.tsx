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
            <nav className={clsx("absolute top-0 left-0 md:relative w-full h-full flex justify-center md:justify-end items-center transition-all", {
                "bg-purple-500 text-white": (pathname === '/register' || pathname === '/login'),
                "bg-white text-slate-900": (pathname !== '/register' && pathname !== '/login'),
                "-translate-y-[100vh] md:translate-y-0": !mobileMenu,
                "translate-y-0 md:translate-y-0": mobileMenu
            })}>
                <ul className="flex flex-col md:flex-row items-center gap-3 text-base font-medium w-4/5 md:w-fit h-3/4 md:h-fit">
                    {links.map((link, key) => (
                        <li key={`${link}-${key}`} className="w-full md:w-fit flex justify-center md:justify-right items-center">
                            {link.child ? (
                                <div className="group w-full md:border-none group">
                                    <Link to={link.path} className="flex justify-center md:justify-left items-center gap-1 md:py-3 w-full md:w-fit flex-1">
                                        {link.name}
                                        <FaAngleDown size={12} />
                                    </Link>
                                    <ul className={clsx("relative md:absolute top-0 md:top-12 rounded-md w-full md:w-[300px] md:bg-white md:border md:border-purple-500 md:hidden flex-row gap-2 py-2 md:shadow-md md:group-hover:flex overflow-hidden h-0 group-hover:h-fit transition-all", {
                                        "text-white" : (pathname === '/register' || pathname === '/login'),
                                        "text-purple-500" : (pathname !== '/register' && pathname !== '/login')
                                    })}>
                                        {link.child.map((child, key) => (
                                            <li key={`${child}-${key}`} className={clsx("w-full md:w-fit px-3 py-1 text-sm text-center md:text-left", key !== 0 && "md:border-l md:border-purple-500")}>
                                                <h3 className="font-bold my-[.5em]">{child.section}</h3>
                                                <ul className="flex flex-col gap-1">
                                                    {child.links.map((link, key) => (
                                                        <li key={`${link}-${key}`}>
                                                            <Link to={link.path} className="hover:opacity-70">{link.name}</Link>
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
                                        clsx((link.path === "/register" || link.path === "/login") ? (
                                            ((pathname === "/register" || pathname === "/login") ?
                                                "bg-white text-purple-500 px-[15px] py-[5px] rounded-md w-full md:w-fit text-center" :
                                                "bg-purple-500 text-white px-[15px] py-[5px] rounded-md w-full md:w-fit text-center"
                                            )
                                        ) : (pathname === "/register" || pathname === "/login") ?
                                            "text-white" :
                                            "text-slate-900"
                                        )
                                    }
                                >{link.name}</Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}