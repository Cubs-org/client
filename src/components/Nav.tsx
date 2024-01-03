import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { links } from "../lib/navData";
import { FaAngleDown } from "react-icons/fa6";

export const Nav = () => {

    const { pathname } = useLocation();

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
                Cub's
            </Link>
            <nav className="relative">
                <ul className="flex flex-row items-center gap-3 text-base font-medium">
                    {links.map((link, key) => link.path ? (
                        <li key={`${link}-${key}`}>
                            {link.child ? (
                                <div className="group">
                                    <Link to={link.path} className="flex items-center gap-1 py-3">
                                        {link.name}
                                        <FaAngleDown size={12} />
                                    </Link>
                                    <ul className="absolute top-12 rounded-md w-[300px] bg-white text-purple-500 border border-purple-500 hidden flex-row gap-2 py-2 shadow-md group-hover:flex">
                                        {link.child.map((child, key) => (
                                            <li key={`${child}-${key}`} className={clsx("px-3 py-1 text-sm", key !== 0 && "border-l border-purple-500")}>
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
                                                "bg-white text-purple-500 px-3 py-2 rounded-md" :
                                                "bg-purple-500 text-white px-3 py-2 rounded-md"
                                            )
                                        ) : (pathname === "/register" || pathname === "/login") ?
                                            "text-white" :
                                            "text-slate-900"
                                        )
                                    }
                                >{link.name}</Link>
                            )}
                        </li>
                    ) : (
                        <li key={`${link}-${key}`}>{link.name}</li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}