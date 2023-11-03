import { FooterProfile } from "./FooterProfile";
import { HeaderProfile } from "./HeaderProfile";

export default function Profile() {
    return (
        <div className="w-4/5 h-full m-auto grid place-items-center">
            <HeaderProfile/>
            <FooterProfile />
        </div>
    )
}