import cleanStr from "../utils/cleanStr"

export type DiscoverDictionary = {
    name: string
    id?: string | number
}

interface IDiscover {
    dictionary: DiscoverDictionary[]
    searchableBy: DiscoverDictionary
    onClick: (option: DiscoverDictionary) => void
}

export const Discover = ({ dictionary, searchableBy, onClick }: IDiscover) => {
    const searchableName = cleanStr(searchableBy.name)
    const mainItems = [] as React.ReactElement[]
    const relatedItems = [] as React.ReactElement[]

    dictionary.forEach((item, index) => {
        const itemName = cleanStr(item.name)

        if (item.name.includes(searchableBy.name)) {
            mainItems.push(
                <li key={`related-${index}`} onClick={() => onClick(item)} className="list-none px-1.5 py-0.5 hover:bg-purple-500 cursor-pointer rounded-md">
                    {item.name}
                </li>
            )
        }
        if (itemName.includes(searchableName) && !item.name.includes(searchableBy.name)) {
            relatedItems.push(
                <li key={`main-${index}`} onClick={() => onClick(item)} className="list-none px-1.5 py-0.5 hover:bg-purple-500 cursor-pointer rounded-md">
                    {item.name}
                </li>
            )
        }
    })

    return searchableBy.name && (mainItems.length > 0 || relatedItems.length > 0) ? (
        <div className="rounded-md p-1 shadow-lg bg-glass-light dark:bg-glass-dark backdrop-blur-sm max-h-40 flex flex-col overflow-y-scroll gap-y-0.5 scrollbar scrollbar-thumb-light-300 dark:scrollbar-thumb-dark-700 scrollbar-track-transparent">
            {mainItems.length > 0 && <>{mainItems}</>}
            {mainItems.length > 0 && relatedItems.length > 0 && <hr className="border-light-400 dark:border-dark-300" />}
            {relatedItems.length > 0 && (
                <>
                    <h6 className="text-sm font-bold leading-3 my-2 px-1">Relacionados</h6>
                    {relatedItems}
                </>
            )}
        </div>
    ) : <span>☁️ Nada foi encontrado...</span>
}