import { ContextMenu } from '../ContextMenu'
import { DropIndicator } from '../Page/Blocks/DropIndicator'

const tableData = {
    header: {
        id: {
            type: 'number',
            width: 100,
        },
        title: {
            type: 'text',
            width: 300,
        },
        verified: {
            type: 'checkbox',
            width: 300,
        },
        author: {
            type: 'text',
            width: 200,
        },
        'created At': {
            type: 'date',
            width: 200,
        },
        'updated At': {
            type: 'date',
            width: 200,
        },
    },
    pages: [{}],
}

const getHeaderGroup = (headerData) =>
    Object.keys(headerData).map((key, _i) => {
        const { width } = headerData[key]

        const styles = {
            width,
        }

        return (
            <th
                key={`${key}-${_i}`}
                className="min-w-[30px] relative"
                style={styles}
            >
                <DropIndicator classNames="absolute top-0 right-0 w-[2px] h-full bg-purple-500 cursor-col-resize" />
                <ContextMenu
                    width="100%"
                    classNames="w-[calc(100%-2px)] text-left px-1 py0.5"
                    items={[
                        { label: 'item-1', name: 'item_1' },
                        { label: 'item-2', name: 'item_2' },
                    ]}
                >
                    {key}
                </ContextMenu>
            </th>
        )
    })

export const Table = () => {
    const headerData = tableData.header
    return (
        <div className="max-w-full h-auto overflow-x-scroll md:scrollbar scrollbar-thumb-light-300 dark:scrollbar-thumb-dark-700 scrollbar-track-transparent">
            <table className="border-collapse border-spacing-0 border border-light-300 dark:border-dark-800">
                <thead>{getHeaderGroup(headerData)}</thead>
            </table>
        </div>
    )
}
