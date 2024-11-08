import { Search } from '../components/Search'
import { SharedPages } from '../components/Shared'
// import { Hub } from "../components/Hub";
import { useUser } from '../contexts/userContext'
import { HubProvider, useHub } from '../contexts/hubContext'

const Header = () => {
    const { pages, settings, setSettings } = useHub()

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value
        setSettings({
            ...settings,
            filter: {
                search,
            },
        })
    }

    const searchValue = settings.filter?.search || ''

    return (
        <header className="w-full flex flex-col-reverse gap-3 md:flex-row justify-between items-center px-2 py-3">
            <div className="w-full md:w-fit flex flex-col justify-center">
                <h1 className="text-2xl md:text-3xl font-extrabold text-dark-400 dark:text-light-300">
                    Área de trabalho
                </h1>
                <span className="text-sm md:text-base text-dark-300 dark:text-light-500">
                    Total de projetos: {pages.length}
                </span>
            </div>

            <div className="w-full md:w-fit flex justify-end gap-2 items-center">
                <Search
                    type="text"
                    placeholder="Pesquisar.."
                    value={searchValue}
                    onChange={handleSearch}
                    iconVisible={searchValue !== '' ? false : true}
                    classNames="w-full md:w-[300px]"
                />
            </div>
        </header>
    )
}

const HubViewer = () => {
    const { settings } = useHub()
    const {
        user: { hubId },
    } = useUser()

    return <>Hub</>
    // <Hub
    //     view="grid"
    //     title="@helder's"
    //     hubId={hubId}
    //     search={settings.filter?.search || ""}
    //     notDisplayTitle
    // />
}

function Workspace() {
    return (
        <div className="w-[98%] m-auto">
            <HubProvider>
                <Header />
                <main>
                    <SharedPages />
                    <hr className="border-t border-light-300 dark:border-dark-800 my-4" />
                    <HubViewer />
                </main>
            </HubProvider>
        </div>
    )
}

export default Workspace
