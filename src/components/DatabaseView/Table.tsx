import { Button } from "../Button"
import { renderIcon, renderPropertiesData, renderPropertiesTitle } from "../Page/renderProperties"

export const Table = ({ data }) => {
    return (
        <div className="flex flex-row gap-1">
            
            <div className="flex flex-col items-center gap-1 flex-grow">
                <table className="w-full rounded-md overflow-hidden ring-1 ring-light-400 dark:ring-dark-700">
                    <thead className="w-full bg-light-300 dark:bg-dark-800 p-4 rounded-md">
                        <tr className="text-left ring-1 ring-light-400 dark:ring-dark-700 px-3 py-1">
                            <th scope="col">
                                <span className="w-full flex gap-2 items-center px-2 py-1">
                                    {renderIcon(data.type)}
                                    Título
                                </span>
                            </th>
                            {renderPropertiesTitle(data.subdata[0].properties)}
                        </tr>
                    </thead>
                    <tbody>
                        {data.subdata.map((page, index) => (
                            <tr key={index}>
                                <td className="ring-1 ring-light-400 dark:ring-dark-700 px-3 py-1">{page.title}</td>
                                {renderPropertiesData(page)}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Button classNames="w-full px-1 py-0.5 bg-transparent text-dark-600 dark:text-light-300 hover:bg-light-300 dark:hover:bg-dark-700">+</Button>
            </div>

            <Button classNames="bg-transparent text-dark-600 dark:text-light-300 hover:bg-light-300 dark:hover:bg-dark-700">+</Button>
        </div>
    )
}