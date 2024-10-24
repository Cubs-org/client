import { DragOverlay, useDroppable } from '@dnd-kit/core'
import { DataBlocks } from '../../../types/page'
import { DropIndicator } from './DropIndicator'
import { DropRow } from './DropRow'
import clsx from 'clsx'
import { Skeleton } from '@/components/Skeleton'

interface BlockProps {
    blocks: DataBlocks[][][]
}

export const Blocks = ({ blocks }: BlockProps) => {
    const { setNodeRef: setRowLastRef, isOver: isRowLastOver } = useDroppable({
        id: `row-${blocks.length + 1}`,
    })

    return (
        <div className="flex flex-col group/row">
            {!(blocks.length > 0) && <Skeleton.Blocks />}
            <DragOverlay>
                <div className="min-w-[200px] max-w-[200px] py-2 text-center rounded-md bg-light-200 text-dark-700 dark:bg-dark:800 dark:text-light-300 border border-dashed border-light-400 dark:border-dark-700">
                    Movendo bloco...
                </div>
            </DragOverlay>
            {(blocks ?? []).map((row, _r) => (
                <DropRow key={_r} row={row} rowIndex={_r} />
            ))}
            <DropIndicator
                classNames={clsx('w-full h-1 bg-purple-500 opacity-0', {
                    'opacity-0': !isRowLastOver,
                    'opacity-100': isRowLastOver,
                })}
                ref={setRowLastRef}
            />
        </div>
    )
}
