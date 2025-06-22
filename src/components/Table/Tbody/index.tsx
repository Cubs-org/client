import { PagePropertiesProps, PageViewer } from '@/types/page'
import { TableData } from '../util'
import { Td } from './Td'

interface TbodyProps {
    cols: string[]
    bodyData: TableData['body']
}

type PageCol =
    | { value: string; type: PagePropertiesProps['type'] }
    | PagePropertiesProps

const reorderPageProps = (cols: string[], line: PageViewer): PageCol[] => {
    const properties = [...line.properties]
    const ordered: PageCol[] = properties.sort((a, b) => {
        const indexA = cols.indexOf(a.title)
        const indexB = cols.indexOf(b.title)
        return indexA - indexB
    })
    const titleIndex = cols.findIndex((t) => t === 'title')
    if (titleIndex !== -1) {
        ordered.splice(titleIndex, 0, {
            type: 'text',
            value: line.title,
        })
    }
    return ordered
}

export const Tbody = ({ cols, bodyData }: TbodyProps) => {
    return (
        <tbody>
            {bodyData.map((line, index) => {
                const orderedProps = reorderPageProps(cols, line)
                return (
                    <tr
                        key={index}
                        className="border-b border-light-300 dark:border-dark-800"
                    >
                        {orderedProps.map((col, colIndex) => {
                            if ('value' in col && 'type' in col)
                                return (
                                    <Td
                                        key={colIndex}
                                        type={col.type}
                                        value={col.value}
                                    />
                                )

                            return (
                                <Td
                                    key={colIndex}
                                    type={col.type}
                                    data={col.data}
                                />
                            )
                        })}
                    </tr>
                )
            })}
        </tbody>
    )
}
