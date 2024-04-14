import { useEffect, useState } from "react";

import clsx from "clsx";

import { Sidebar } from "./Sidebar";
import { Modal } from "../Modal";
import { useModal } from "../../contexts/modalContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import fetchWorkspace from "../../api/fetchWorkspace";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../contexts/authProvider";
import getUser from "../../api/getUser";
import { useUser } from "../../contexts/userContext";
import Loading from "../Loading";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../../lib/api";

export const Layout = () => {

    const socket = io(SOCKET_URL, {
        transports: ["websocket"]
    });
    const { setUser } = useUser();

    const { token } = useAuth();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [userFetched, setUserFetched] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (!userFetched) {
            const userId = (jwtDecode(token as string) as any).user.id;

            getUser(userId)
                .then(res => {
                    setUser(res.data.user);
                }).finally(() => {
                    setUserFetched(true);
                });
        }
    }, [userFetched]);

    useEffect(() => {
        if (token) {
            let user;
            user = localStorage.getItem("user");

            user = (jwtDecode(token as string) as any).user;
            
            if (user.id) {
                let workspaceId, currentPath;

                fetchWorkspace(user.id)
                    .then(workspace => {
                        workspaceId = workspace.id;
                        currentPath = pathname.split("/");
                        currentPath.shift();

                        if (
                            workspaceId 
                            && (currentPath[0] === "workspace" || currentPath[0] === "")
                            || currentPath[0] === "login" || currentPath[0] === "register") {
                            navigate(`/workspace/${workspaceId}`);
                        }
                    }).then(() => {
                        currentPath = pathname.split("/");
                        currentPath.shift();
                        
                        if (
                            (currentPath[0] === "workspace" && currentPath[1] !== workspaceId) 
                            && (currentPath[0] !== "not-found" && currentPath[1] !== "")
                        ) {
                            navigate(`/not-found`);
                        }
                    }).finally(() => {
                        setLoading(true);
                    })
            }
        }

    }, [token]);
    
    let _layout;
    const [layout, setLayout] = useState(true);
    
    useEffect(() => {

        _layout = JSON.parse(localStorage.getItem("layout") || "true")
        setLayout(_layout)

        if (socket) {
            socket.on("updateUser", (user) => {
                setUser(user);
            });
        }
    }, []);

    const handleSetLayout = () => {
        setLayout(!layout)
        localStorage.setItem("layout", JSON.stringify(!layout))
    }

    const { modalState:{ visible, content }, closeModal } = useModal();

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-light-100 dark:bg-dark-900">
            <div className={clsx("w-[98%] m-auto h-full flex  flex-col lg:flex-row items-center gap-3")}>
                <Modal visible={visible} closeModal={closeModal}>{content}</Modal>
                <Sidebar layout={layout} handleSetLayout={handleSetLayout}/>
                <div className={clsx("w-full h-full lg:p-4 lg:h-[95vh] lg:shadow-full lg:rounded-2xl text-dark-600 dark:text-light-200 bg-light-100 dark:bg-dark-900 transition-all overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-light-300 dark:scrollbar-thumb-dark-700 scrollbar-track-transparent", {
                    // "lg:absolute lg:left-8 lg:w-[calc(100%-32px)]" : !layout,
                })}>
                    {!loading ? <Loading /> : <Outlet />}
                </div>
            </div>
        </div>
    );
}