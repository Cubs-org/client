import { useEffect, useReducer } from "react";

import { branch } from "../lib/skeleton.json";

import { IconPicker } from "../components/IconPicker";
import { Page as Pg } from "../components/Page/Content";
import { TextArea } from "../components/TextArea";
import { NewTool } from "../components/Page/Content/NewTool";
import handlePage from "../utils/page/handleHeaderPage";
import { useLocation } from "react-router-dom";

const twiconsPath = "/twicons/";

function Page() {

    const { pathname } = useLocation();
    const pageId = pathname.split("/").pop(),
        currentPage = branch.find(page => page.id === pageId) || branch[0];

    const [pageData, setPageData] = useReducer(handlePage, currentPage);

    const members = [
        {name:"Helder Martins", icon:"cervo", email:"helder@gmail.com"},
        {name:"Gabriel Nogueira", icon:"gorila", email:"nogs@gmail.com"},
        {name:"Augusto Kawashima", icon:"panda", email:"gutin@hotmail.com"}
    ];

    useEffect(() => {
        document.title = pageData.title || "Sem título";
        let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
        // link.href = pageData.data.icon;
        link.href = `${twiconsPath}/${pageData.data.icon}.svg`;
    }, [pageData.title, pageData.data.icon]);

    return (
        <main className="m-auto w-[95%] lg:w-full">
            <Pg.Header 
                currentPage={pageData}
                setPageData={setPageData}
                branch={branch}
                members={members}
            />
            <header
                className="flex items-start gap-1 my-3"
            >

                <IconPicker 
                    icon={pageData.data.icon}
                    setIcon={(icon) => {
                        // @ts-ignore
                        setPageData({type:"icon", payload:icon})
                    }}
                    classNames="w-8 h-8 mt-2 rounded-md text-2xl hover:bg-light-300 dark:hover:bg-dark-700 flex items-center justify-center cursor-pointer"
                />

                <TextArea 
                    value={pageData.title}
                    placeholder={"Sem título"}
                    handle={(newValue) => console.log(newValue)}
                    classNames="w-full text-3xl font-bold"
                    outlineDisabled
                />
            </header>
            <NewTool />
        </main>
    )
}

export default Page;