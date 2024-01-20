import { FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa"
import { SignOutButton } from "../../SignOutButton"

export const UserSettings = () => {
    const items = [
        {
            name: "Perfil",
            icon: <FaUserCircle size={16}/>,
            link: "/profile"
        },
        {
            //  TODO: GET CURRENT PAGE AND MERGE WITH MODAL CONTAINS NOTIFICATIONS
            name: "Notificações",
            icon: <FaBell size={16}/>,
            link: "/notifications"
        },
        {
            name: "Sair",
            icon: <FaSignOutAlt size={16}/>
        }
    ]
    return (
        <div className="w-full flex flex-col gap-1 p-1">
            {items.map((item, index) => (
                    <div key={`${item}-${index}`}>
                        {item.name !== "Sair" && (
                            <a 
                                href={item?.link || ''}
                                key={`${index}-${item}`} 
                            >
                                <div
                                    className="flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer text-sm text-dark-600 hover:bg-light-300 dark:text-light-400 dark:hover:bg-dark-500">
                                    {item.icon}
                                    <span>{item.name}</span>
                                </div>
                            </a>
                        )}
                        {index !== (items.length -1) && <hr className="mt-1 border-light-300 dark:border-dark-100"/>}
                        {item.name === "Sair" && (
                            <SignOutButton classNames="w-full">
                                <div 
                                    key={`${index}-${item}`} 
                                    className="flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer text-sm text-red-500 dark:text-red-400 hover:bg-light-300 dark:hover:bg-dark-500">
                                    {item.icon}
                                    <span>{item.name}</span>
                                </div>
                            </SignOutButton>)
                        }
                    </div>
                ))}
        </div>
    )
}