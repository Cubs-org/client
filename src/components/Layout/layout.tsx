import { useEffect, useState } from "react";

import clsx from "clsx";

import { Sidebar } from "./Sidebar";
import { Modal } from "../Modal";
import { useModal } from "../../contexts/modalContext";
import { useLocation, useNavigate } from "react-router-dom";
import fetchWorkspace from "../../api/fetchWorkspace";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../contexts/authProvider";
import getUser from "../../api/user/getUser";
import { useUser } from "../../contexts/userContext";
import Loading from "../Loading";
import { PageProvider } from "../../contexts/pageContext";
import { useSocket } from "../../contexts/socketContext";
import { TokenDecoded } from "@/types/user";

export const RootLayout = ({ children }) => {
    const { setUser } = useUser();
    const { listener } = useSocket();
    const { modalState:{ visible, content }, closeModal } = useModal();

    const { token } = useAuth();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [userFetched, setUserFetched] = useState(false);
    const [loading, setLoading] = useState(false);

    const [tokenDecoded, setTokenDecoded] = useState<TokenDecoded | null>(null);
    const [layout, setLayout] = useState(true);

    const handleSetLayout = () => {
        setLayout(!layout)
        localStorage.setItem("layout", JSON.stringify(!layout))
    }

    useEffect(() => {
        if (token && !tokenDecoded) {
            setTokenDecoded(jwtDecode(token as string) as TokenDecoded);
        }
    }, [token]);

    useEffect(() => {

        if (!userFetched && tokenDecoded) {
            const { user, hubId } = tokenDecoded;

            getUser(user.id)
                .then(res => {
                    const { user:data } = res.data;
                    setUser({ data, hubId });
                }).finally(() => {
                    setUserFetched(true);
                });
        }
    }, [userFetched, tokenDecoded]);

    useEffect(() => {
        if (tokenDecoded) {
            const { user } = tokenDecoded;
            
            if (user.id) {
                fetchWorkspace(user.id)
                    .then(workspace => {
                        const workspaceId = workspace.id;
                        const currentPath = pathname.split("/");
                        currentPath.shift();

                        const redirectToWorkspace = ["", "workspace", "login", "register"].includes(currentPath[0]);

                        if (workspaceId && redirectToWorkspace) {
                            navigate(`/workspace/${workspaceId}`);
                        }

                        // navigate(`/not-found`);
                    }).finally(() => {
                        setLoading(true);
                    })
            }
        }

    }, [tokenDecoded]);
    
    useEffect(() => {
        setLayout(JSON.parse(localStorage.getItem("layout") || "true"))

        if (listener) listener.on("updateUser", (user) => setUser(user));
    }, []);

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-light-100 dark:bg-dark-900">
            <div className={clsx("w-full ml-[1%] h-full flex  flex-col lg:flex-row items-center gap-3")}>
                <Modal visible={visible} closeModal={closeModal}>{content}</Modal>
                <Sidebar layout={layout} handleSetLayout={handleSetLayout}/>
                <div className={clsx("w-full h-full lg:p-4 text-dark-600 dark:text-light-200 bg-light-100 dark:bg-dark-900 transition-all overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-light-300 dark:scrollbar-thumb-dark-700 scrollbar-track-transparent", {
                    // "lg:absolute lg:left-8 lg:w-[calc(100%-32px)]" : !layout,
                })}>
                    <PageProvider>
                        {!loading ? <Loading /> : children}
                    </PageProvider>
                </div>
            </div>
        </div>
    );
}