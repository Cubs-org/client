import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

export const Nav = () => {

    const links = [
        {
            name: "Página inicial",
            path: "/"
        },
        {
            name: "Serviços",
            path: "/services"
        },
        {
            name: "Mais opções",
            child: [
                {
                    section: "Apps & Plataformas",
                    links: [
                        {
                            name: "Web",
                            path: "/"
                        },
                        {
                            name: "App Desktop",
                            path: "/microsoftstore"
                        },
                        {
                            name: "App Mobile",
                            path: "/googleplay"
                        }
                    ],
                },
                {
                    section: "Mais Informações",
                    links: [
                        {
                            name: "Sobre nós",
                            path: "/about"
                        },
                        {
                            name: "Contato",
                            path: "/contact"
                        }
                    ]
                }
            ]
        },
        {
            name: "Entre",
            path: "/login"
        },
        {
            name: "Cadastre-se",
            path: "/register"
        }
    ];

    const { pathname } = useLocation();

    return (
        <nav className={clsx("w-full h-[10vh] flex items-center justify-between px-5", (
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
            <ul className="flex flex-row items-center gap-3 text-base font-medium">
                {links.map((link, key) => link.path ? (
                    <li key={`${link}-${key}`}>
                        <Link 
                            to={link.path}
                            className={
                                clsx((link.path === "/register" || link.path === "/login") ? (
                                    ((pathname === "/register" || pathname === "/login") ?
                                        "bg-white text-secondary px-3 py-2 rounded-md" :
                                        "bg-secondary text-white px-3 py-2 rounded-md"
                                    )
                                ) : (pathname === "/register" || pathname === "/login") ?
                                    "text-white" :
                                    "text-slate-900"
                                )
                            }
                        >{link.name}</Link>
                    </li>
                ) : (
                    <li key={`${link}-${key}`}>{link.name}</li>
                ))}
            </ul>
        </nav>
    );
}