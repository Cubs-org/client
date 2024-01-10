import clsx from "clsx";
import { useLocation } from "react-router-dom";

export const Footer = () => {

    const { pathname } = useLocation();

    return (
        <footer className={clsx("w-full h-[10vh] flex items-center justify-between px-5", (
            (pathname === '/register' || pathname === '/login') ?
            "bg-purple-500 text-white" : "bg-white text-slate-900"
        ))}>
            <span className="w-full font-medium text-center md:text-right text-sm md:text-base">
                Cub's © 2023 - Todos os direitos reservados
            </span>
        </footer>
    );
}