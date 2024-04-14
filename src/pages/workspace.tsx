import { useEffect, useState } from "react"

import { io } from "socket.io-client"
import { SOCKET_URL } from "../lib/api"

import { DatabaseView } from "../components/DatabaseView"
import { Search } from "../components/Search"

import { useLocation } from "react-router-dom"

import { getDatahubId } from "../api/fetchDatahubId"

import { PageProps } from "../interfaces/page"
import updatedAtFormat from "../utils/datetime/updatedAtFormat"

type SharedPages = {
    data: any;
    title: string;
    updated_at: string;
    email: string;
    is_admin: boolean;
}[];

function Workspace() {

    const socket = io(SOCKET_URL, {
        transports: ["websocket"]
    });

    const [hubId, setHubId] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [items, setItems] = useState<PageProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [shared, setShared] = useState<SharedPages>([]);

    const { pathname } = useLocation();

    const handleSetItems = (data: PageProps[]) => setItems(data);

    const handleSetItemsAfterCreate = (data: PageProps) => setItems(prev => [...prev, data]);

    useEffect(() => {

        let wkspId = pathname.split("/")[2];

        if (!wkspId) return;
        if (loading) {
            getDatahubId(wkspId)
                .then((id) => {
                    const hub_id = id as any;
                    socket.emit('getItems', { hubId: id });

                    socket.on('items', (data) => {
                        handleSetItems(data);
                    });

                    setHubId(hub_id);
                }).finally(() => setLoading(false));
        }

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

        socket.emit('getPagesByMemberId/emit', { id: "d5db2b7b-1573-45a7-a0ad-73cea311d369" });
        socket.on('getPagesByMemberId/on', (data) => setShared(data));

        return () => {
            socket.off('getPagesByMemberId/emit');
            socket.off('getPagesByMemberId/on');
        }
    }, []);

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

                <section className="overflow-x-hidden mb-2">
                    <h2 className="text-lg font-semibold text-dark-400 dark:text-light-300">Compartilhados com você</h2>
                    <div className="flex flex-row gap-3 py-2">
                        {shared.map((page, index) => (
                            <div key={index} className="min-w-[200px] flex flex-col gap-2 rounded-lg px-2 py-1.5 bg-light-200 dark:bg-dark-800 border border-light-300 dark:border-dark-700">
                                <span className="font-bold text-lg text-dark-300 dark:text-light-500">{page.title}</span>
                                <span className="text-xs text-dark-400 dark:text-light-300">{updatedAtFormat(page.updated_at)}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <hr className="
                    border-t border-light-300 dark:border-dark-800 my-4
                " />

                <DatabaseView
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
