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
        id: `left:col-${rowIndex}-${colIndex}`,
    })

    const { setNodeRef: setAfColRef, isOver: isAfColOver } = useDroppable({
        id: `bottom:col-${rowIndex}-${colIndex}`,
    })

    return (
        <div className="flex flex-grow" key={colIndex}>
            <DropIndicator
                classNames={clsx('h-full min-w-[5px] bg-purple-500 opacity-0', {
                    'opacity-0': !isBfColOver,
                    'opacity-100': isBfColOver,
                })}
                ref={setBfColRef}
            />
            <div className="flex flex-col flex-grow">
                {col.map((block, _b) => (
                    // { isCol, _b, _r, _c, ...block }
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
                        classNames={clsx(
                            'w-full h-1 bg-purple-500 opacity-0',
                            {
                                'opacity-0': !isAfColOver,
                                'opacity-100': isAfColOver,
                            }
                        )}
                        ref={setAfColRef}
                    />
                )}
            </div>
        </div>
    )
}
