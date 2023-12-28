export const Nav = () => {
    return (
        <nav className="w-full h-[10vh] flex items-center justify-between px-5">
            <h1 className="text-2xl font-bold">Cub's</h1>
            <ul className="flex gap-5">
                <li className="cursor-pointer">Home</li>
                <li className="cursor-pointer">Sobre</li>
                <li className="cursor-pointer">Contato</li>
            </ul>
        </nav>
    );
}