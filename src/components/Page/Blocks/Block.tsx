import clsx from 'clsx'
import { LuGripVertical } from 'react-icons/lu'
import { DataBlocks } from '../../../types/page'
import { CSSProperties } from 'react'
// import { useSortable } from '@dnd-kit/sortable'
import { RenderBlocks } from './RenderBlocks'
import { ContextMenu } from '@/components/ContextMenu'
import { useDraggable } from '@dnd-kit/core'

export const Block = ({
    id,
    data = { align: 'left' },
    ...rest
}: DataBlocks) => {
    const dndContext = useDraggable({ id })
    const { attributes, listeners, setNodeRef, isDragging } = dndContext

    const styles: CSSProperties = {
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            className={clsx(
                'relative max-w-full w-full h-fit flex flex-grow items-start rounded-md group'
            )}
            style={styles}
        >
            <ContextMenu
                items={blockMenu}
                btnProps={{
                    ...attributes,
                    ...listeners,
                }}
            >
                <LuGripVertical
                    size={24}
                    className="opacity-0 cursor-grab rounded-md hover:bg-light-200 text-light-900 dark:hover:bg-dark-800 dark:text-dark-100 text-xs font-bold group-hover:opacity-100"
                />
            </ContextMenu>
            <div className="w-full relative">
                {/* <span>:{id}</span> */}
                <RenderBlocks {...rest} />
            </div>
        </div>
    )
}

const blockMenu = [
    {
        name: 'edit',
        label: 'Edit',
        // icon: <LuGripVertical size={24} />,
        onClick: () => {},
    },
    {
        name: 'copy',
        label: 'Copy',
        // icon: <LuGripVertical size={24} />,
        onClick: () => {},
    },
    {
        name: 'delete',
        label: 'Delete',
        // icon: <LuGripVertical size={24} />,
        color: 'red',
        onClick: () => {},
    },
]
