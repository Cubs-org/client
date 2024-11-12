import { DropIndicator } from './DropIndicator'
import clsx from 'clsx'
import { useDroppable } from '@dnd-kit/core'
import { DropBlocks } from './DropBlocks'

interface DropBlocksProps {
    isCol: boolean
    rowIndex: number
    colIndex: number
    col: any
}

export const DropCol = ({
    isCol,
    colIndex,
    rowIndex,
    col,
}: DropBlocksProps) => {
    const { setNodeRef: setBfColRef, isOver: isBfColOver } = useDroppable({
        id: `left:col-${rowIndex + 1}-${colIndex + 1}`,
    })

    const { setNodeRef: setAfColRef, isOver: isAfColOver } = useDroppable({
        id: `bottom:col-${rowIndex + 1}-${colIndex + 1}`,
    })

    const colWidth = Math.max(...col.map((b) => Number(b?.data?.width || 0)))

    return (
        <div
            key={colIndex}
            className="flex flex-grow"
            style={
                colWidth > 0
                    ? { minWidth: `${colWidth}%`, width: `${colWidth}%` }
                    : {}
            }
        >
            <DropIndicator
                classNames={clsx('h-full min-w-[5px] bg-violet-500 opacity-0', {
                    'opacity-0': !isBfColOver,
                    'opacity-100': isBfColOver,
                })}
                ref={setBfColRef}
            />
            <div className="flex flex-col flex-grow">
                {col.map((block, _b) => (
                    <DropBlocks
                        key={_b}
                        isCol={isCol}
                        blockIndex={_b}
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                        {...block}
                    />
                ))}
                {isCol && (
                    <DropIndicator
                        classNames={clsx('w-full h-1 bg-violet-500 opacity-0', {
                            'opacity-0': !isAfColOver,
                            'opacity-100': isAfColOver,
                        })}
                        ref={setAfColRef}
                    />
                )}
            </div>
        </div>
    )
}
