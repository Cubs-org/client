import { io } from "socket.io-client";
import { BodyProfile } from "../components/Profile/BodyProfile";
import { FooterProfile } from "../components/Profile/FooterProfile";
import { HeaderProfile } from "../components/Profile/HeaderProfile";
import { useAuth } from "../contexts/authProvider";
import { SOCKET_URL } from "../lib/api";
import { useEffect, useState } from "react";
import { IUserAccount } from "../interfaces/user";
import { jwtDecode } from "jwt-decode";
import getUser from "../api/getUser";

export default function Profile() {

    const { token } = useAuth();

    const socket = io(SOCKET_URL);
    
    const [userData, setUserData] = useState<IUserAccount>({
        id: "a1b2c3d4e5f6g7h8i9j0",
        name: "Usuário",
        email: "user@adress",
        icon: "/src/assets/default-user.jpg",
        createdAt: "00/00/0000",
        updatedAt: "00/00/0000",
        accountType: "free",
        status: "active",
        planType: "perMonth",
        paymentType: "creditCard",
    })
    const [userFetched, setUserFetched] = useState(false);

    useEffect(() => {

        if (!userFetched) {
            const userId = (jwtDecode(token as string) as any).user.id;

            getUser(userId).then(res => {
                setUserData(res.data.user);
                setUserFetched(true);
            });
        }

        socket.on("getUser", (user) => {
            setUserData(user);
        });
    }, [socket, userFetched]);

    return (
        <div className="w-full h-full flex flex-col">
            <HeaderProfile user={userData} />
                <BodyProfile socket={socket} userData={userData} setUserData={setUserData} />
            <FooterProfile />
        </div>
    )
}