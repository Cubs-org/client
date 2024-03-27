import { useEffect, useState } from "react"

import { io } from "socket.io-client"
import { SOCKET_URL } from "../lib/api"

import { DatabaseView } from "../components/DatabaseView"
import { Search } from "../components/Search"

import { useLocation } from "react-router-dom"

import { getDatahubId } from "../api/fetchDatahubId"

import { PageProps } from "../interfaces/page"

function Workspace() {

    const socket = io(SOCKET_URL, {
        transports: ["websocket"]
    });

    const [hubId, setHubId] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [items, setItems] = useState<PageProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { pathname } = useLocation();

    const handleSetItems = (data: PageProps[]) => setItems(data);

    const handleSetItemsAfterCreate = (data: PageProps) => setItems(prev => [...prev, data]);

    useEffect(() => {
        
        socket.connect();

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
            // socket.disconnect();
        }
    }, []);

    return (
        <div>
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

            <main className="px-3">
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
