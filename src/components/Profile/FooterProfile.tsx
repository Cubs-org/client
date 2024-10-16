import { FaSignOutAlt } from "react-icons/fa"
import { SignOutButton } from "../SignOutButton"

export const FooterProfile = () => {
    return (
        <SignOutButton classNames="w-4/5 mx-auto mb-6 lg:w-full flex items-center gap-2 p-2 rounded-md bg-red-500 text-light-300 text-lg font-semibold">
            <FaSignOutAlt size={24} />
            Sair
        </SignOutButton>
    )
}