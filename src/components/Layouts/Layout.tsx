import { useEffect, useState } from "react";

import clsx from "clsx";

import { Sidebar } from "./Sidebar";
import { Modal } from "../Modal";
import { useModal } from "../../contexts/modalContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import fetchWorkspace from "../../api/fetchWorkspace";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../contexts/authProvider";

export const Layout = () => {

    const [authenticated, setAuthenticated] = useState({
        status: false,
        data: {} as any
    });

    const { token } = useAuth();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // const isValidRoute = (routes) => routes.some(route => ((route.path === pathname) || (pathname === authenticated.data.workspace.id)));
    
    useEffect(() => {
        if (token && !authenticated.status) {
            const user = (jwtDecode(token as string) as any).user;
            fetchWorkspace(user.id)
                .then(workspace => {
                    setAuthenticated({
                        status: true,
                        data: {
                            user,
                            workspace
                        }
                    });
                });
        }

        if (authenticated.status && pathname === "/") {
            var wksp = authenticated.data.workspace.id;
            // return <Navigate to={`/${wksp}`} />;
            navigate(`/${wksp}`);
        } 
        // else if (authenticated.status && !isValidRoute(data.authenticated[0].children[0].children)) {
        //     var wksp = authenticated.data.workspace.id;
        //     if (pathname !== wksp)
        //         navigate("/not-found");
        //     else
        //         navigate("/");
        // }

    }, [token, authenticated]);
    
    let _layout;
    const [layout, setLayout] = useState(true);
    
    useEffect(() => {
        _layout = JSON.parse(localStorage.getItem("layout") || "true")
        setLayout(_layout)
    }, []);

    const handleSetLayout = () => {
        setLayout(!layout)
        localStorage.setItem("layout", JSON.stringify(!layout))
    }

    // @ts-ignore
    const { modalState:{ visible, content }, openModal, closeModal } = useModal();

    return (
        <div className="w-screen h-screen grid place-items-center bg-light-100 dark:bg-dark-900">
            <div className={clsx("relative lg:absolute w-full h-full lg:w-[95%] lg:h-[90vh] flex flex-col lg:flex-row items-center justify-between lg:gap-3")}>
                <Modal visible={visible} closeModal={closeModal}>{content}</Modal>
                <Sidebar layout={layout} handleSetLayout={handleSetLayout}/>
                <div className={clsx("relative lg:absolute right-0 h-full lg:p-4 lg:shadow-full lg:rounded-2xl text-dark-600 dark:text-light-200 bg-light-100 dark:bg-dark-800 transition-all overflow-hidden", {
                    "w-full lg:w-[calc(100%-100px)]" : layout,
                    "w-full lg:w-full" : !layout,
                })}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}