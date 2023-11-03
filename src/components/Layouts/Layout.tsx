import { useEffect, useState } from "react";
import clsx from "clsx";

import { Sidebar } from "./Sidebar";
import Loading from "../Loading";

export const Layout = ({ children }) => {
    let _layout;
    const [layout, setLayout] = useState(true);

    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        _layout = JSON.parse(localStorage.getItem("layout") || "true")
        setLayout(_layout)
    }, [])

    const handleSetLayout = () => {
        setLayout(!layout)
        localStorage.setItem("layout", JSON.stringify(!layout))
    }
    
    return (
        <>
            {loading ? <Loading/> : (
                <div className="w-screen h-screen grid place-items-center bg-light-100 dark:bg-dark-900">
                    <div className={clsx("relative lg:absolute w-full h-full lg:w-[95%] lg:h-[90vh] flex flex-col lg:flex-row items-center justify-between lg:gap-3")}>
                        <Sidebar layout={layout} handleSetLayout={handleSetLayout}/>
                        <div className={clsx("relative lg:absolute right-0 h-full lg:p-4 lg:shadow-full lg:rounded-2xl text-dark-600 dark:text-light-200 bg-light-100 dark:bg-dark-800", {
                            "w-full lg:w-[calc(100%-100px)]" : layout,
                            "w-full lg:w-full" : !layout,
                        })}>
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}