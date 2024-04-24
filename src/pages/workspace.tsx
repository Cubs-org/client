import { useEffect, useState } from "react"

import { io } from "socket.io-client"
import { SOCKET_URL } from "../lib/api"

import { Search } from "../components/Search"

import { PageProps } from "../interfaces/page"
import updatedAtFormat from "../utils/datetime/updatedAtFormat"
import { useUser } from "../contexts/userContext"
import minimizeText from "../utils/minimizeText"
import { Skeleton } from "../custom/Skeleton"
import { Hub } from "../custom/Hub"
import { Container } from "../components/Container"
import { Emoji } from "emoji-picker-react"
import clsx from "clsx"
import { Link } from "react-router-dom"

// type SharedPages as Page
type SharedPages = {
    id: string;
    data: any;
    title: string;
    updated_at: string;
    email: string;
    is_admin: boolean;
};

type SharedProps = {
    pages: SharedPages[];
    loaded: boolean;
};

const socket = io(SOCKET_URL);

function Workspace() {

    const [search, setSearch] = useState<string>("");
    const [items, setItems] = useState<PageProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [shared, setShared] = useState<SharedProps>({ pages: [], loaded: false });

    const { user: { data: { email }, hubId } } = useUser();

    const handleSetItems = (data: PageProps[]) => setItems(data);

    const handleSetItemsAfterCreate = (data: PageProps) => setItems(prev => [...prev, data]);

    useEffect(() => {

        socket.emit('getItems', { hubId });

        socket.on('items', (data) => {
            handleSetItems(data);
            setLoading(false);
        });

        socket.on('columnMoved', (data) => handleSetItems(data));
        socket.on('columnResized', (data) => handleSetItems(data));
        socket.on('pageCreated', (data: PageProps) => handleSetItemsAfterCreate(data));

        return () => {
            socket.off('items');
            socket.off('columnMoved');
            socket.off('columnResized');
            socket.off('pageCreated');
        }
    }, []);

    useEffect(() => {

        if (email) {
            socket.emit('getPagesByMemberId', { email });
            socket.on('getPagesByMemberId', (data) => setShared({ pages: data, loaded: true }));
        }

        return () => {
            socket.off('getPagesByMemberId');
        }
    }, [shared]);

    return (
        <div className="w-[98%] m-auto">
            <header className="w-full flex flex-col-reverse gap-3 md:flex-row justify-between items-center px-2 py-3">

                <div className="w-full md:w-fit flex flex-col justify-center">
                    <h1
                        className="text-2xl md:text-3xl font-extrabold text-dark-400 dark:text-light-300"
                    >Área de trabalho</h1>
                    <span
                        className="text-sm md:text-base text-dark-300 dark:text-light-500"
                    >Total de projetos: {items.length}</span>
                </div>

                <div className="w-full md:w-fit flex justify-end gap-2 items-center">

                    <Search
                        type="text"
                        placeholder="Pesquisar.."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        iconVisible={search !== "" ? false : true}
                        classNames="w-full md:w-[300px]"
                    />
                </div>
            </header>

            <main>

                {/* TODO: Verify UserPreferences if Shared comes first */}
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

                <hr className="border-t border-light-300 dark:border-dark-800 my-4" />

                <Hub
                    view="grid"
                    title="@helder's"
                    datahubId={hubId}
                    loading={loading}
                    items={items}
                    handleSetItems={handleSetItems}
                    search={search}
                    notDisplayTitle
                />
            </main>
        </div>
    )
}

export default Workspace
