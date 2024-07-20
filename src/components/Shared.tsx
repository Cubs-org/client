import { useState } from "react";
import { Container } from "./Container";
import { Skeleton } from "./custom/Skeleton";
import clsx from "clsx";
import { Emoji } from "emoji-picker-react";
import { Link } from "react-router-dom";
import updatedAtFormat from "../utils/datetime/updatedAtFormat";
import minimizeText from "../utils/minimizeText";

type TSharedPages = {
    id: string;
    data: any;
    title: string;
    updated_at: string;
    email: string;
    is_admin: boolean;
};

type SharedProps = {
    pages: TSharedPages[];
    loaded: boolean;
};

export const SharedPages = () => {
    const [shared] = useState<SharedProps>({
        loaded: true,
        pages: []
    });

    return shared.pages.length > 0 ? (
        <section className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold">Compartilhados comigo</h3>
                <span className="text-sm text-light-900 dark:text-dark-100">{shared.pages.length} pág.</span>
            </div>

            <Container>
                {!shared.loaded ? <Skeleton.Shared /> : (
                    shared.pages.map((page, index) => {
                        const icon = page.data?.icon ? page.data.icon : "";
                        return (
                            <Link
                                state={{ title: page.title }}
                                to={{
                                    pathname: `/page/${page.id}`,
                                }}
                                key={`${page.title}-${index}`}
                                className="relative w-[200px] h-32 bg-light-100 dark:bg-dark-900 text-light-800 dark:text-dark-100 rounded-md flex flex-col gap-1 border border-light-300 dark:border-dark-700 cursor-pointer group/card"
                            >
                                <div className="px-3 pb-1 flex items-end justify-start w-full h-16 bg-light-200 group-hover/card:bg-light-300 dark:bg-dark-800 dark:group-hover/card:bg-dark-700 dark:bd-dark-800 rounded-[6px_6px_0px_0px]">
                                    <div className="flex items-center gap-2">
                                        {icon && <Emoji unified={icon} size={24} />}
                                        <h3 className="font-bold text-sm md:text-lg text-dark-400 dark:text-light-200">{page.title ? minimizeText(page.title, icon ? 13 : 16) : "Sem título"}</h3>
                                    </div>
                                </div>
                                <div className="px-3 flex items-center gap-2 mt-1">
                                    <span className={clsx("w-3 h-3 rounded-full", {
                                        "bg-green-500 group-hover/card:bg-green-400 group-hover/card:shadow-lg group-hover/card:shadow-green-500": page.is_admin,
                                        "bg-red-500 group-hover/card:bg-red-400 group-hover/card:shadow-lg group-hover/card:shadow-red-500": !page.is_admin
                                    })} />
                                    <span className="font-semibold text-xs">admin</span>
                                </div>
                                <span className="mt-2 px-3 font-semibold text-xs">{updatedAtFormat(page.updated_at)}</span>
                            </Link>
                        )
                    })
                )}
            </Container>
        </section>
    ): null
}