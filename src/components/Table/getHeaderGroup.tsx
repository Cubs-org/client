import { ContextMenu } from '../ContextMenu'
import { Icon } from '../IconPicker'
import { DropIndicator } from '../Page/Blocks/DropIndicator'
import { TableData } from './util'

export const getHeaderGroup = (headerData: TableData['header']) =>
    Object.keys(headerData).map((key, _i) => {
        const { width } = headerData[key]

        const styles = {
            minWidth: `${width}px`,
        }

        return (
            <th
                key={`${key}-${_i}`}
                className="min-w-[30px] relative"
                style={styles}
            >
                <DropIndicator classNames="absolute top-0 right-0 w-[3px] h-full bg-light-400 cursor-col-resize hover:bg-violet-500" />
                <ContextMenu
                    width="100%"
                    direction="start"
                    classNames="w-[calc(100%-2px)] text-left px-1 py-0.5"
                    items={[
                        { label: 'item-1', name: 'item_1' },
                        { label: 'item-2', name: 'item_2' },
                    ]}
                >
                    <div className="flex items-center gap-3 whitespace-nowrap text-ellipsis">
                        <Icon icon="1f642" size={18} />
                        <span className="truncate">{key}</span>
                    </div>
                </ContextMenu>
            </th>
        )
    })
