import { DatabaseView } from "../components/DatabaseView"
import { Popover } from "../components/Popover"
import { Search } from "../components/Search"
import { useEffect, useState } from "react"
import { WorkspaceFilterOptions } from "../components/Workspace/WorkspaceFilterOptions"
import { FaEllipsisVertical } from "react-icons/fa6"
import { getDatahubId } from "../api/fetchDatahubId"
// import { IDatabaseViewProps } from "../interfaces/datahub"
import { useLocation } from "react-router-dom"
import { SOCKET_URL } from "../lib/api"
import { io } from "socket.io-client"
import { PageProps } from "../interfaces/page"

function Workspace() {

    const [search, setSearch] = useState("")

    const [options, setOptions] = useState(false)

    const toggleOptions = () => setOptions(!options);

    const socket = io(SOCKET_URL);

    const [datahub, setDatahub] = useState<PageProps[]>([]);

    const { pathname } = useLocation();

    useEffect(() => {

        let wkspId = pathname.split("/")[2];

        getDatahubId(wkspId)
            .then((id) => {
                // console.log(data);
                socket.emit('getItems', { hubId: id });

                socket.on('items', (data) => {
                    console.log("test", data);
                    setDatahub(data);
                });
            });

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
                    >Total de projetos: 3</span>
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

                    <Popover
                        direction="bottom-start"
                        content={<WorkspaceFilterOptions />}
                    >
                        <div className="w-fit p-2">
                            <FaEllipsisVertical size={24} className="cursor-pointer" onClick={toggleOptions} />
                        </div>
                    </Popover>


                </div>
            </header>

            <DatabaseView
                view="grid"
                data={{
                    title: "Habit Tracker", subdata: datahub
                }}
                search={search}
                notDisplayTitle
            />
        </div>
    )
}

export default Workspace
