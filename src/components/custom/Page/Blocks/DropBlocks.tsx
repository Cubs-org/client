import { DropIndicator } from './DropIndicator';
import { Block } from './Block';
import clsx from 'clsx';
import { useDroppable } from '@dnd-kit/core';
import { DataBlocks } from '../../../../interfaces/page';

interface DropBlocksProps extends DataBlocks {
    isCol: boolean
    rowIndex: number
    colIndex: number
    blockIndex: number
}

export const DropBlocks = ({ isCol, blockIndex, colIndex, rowIndex, ...block }: DropBlocksProps) => {
    const {
        setNodeRef,
        isOver
    } = useDroppable({ 
        id: `top:col-${block.id}-${blockIndex}`
    });

    const sortableId = `${rowIndex}-${colIndex}-${blockIndex}-${block.id}`;

    return (
        <div className="flex flex-col flex-grow gap-0.5 group/y" key={blockIndex}>
            {isCol && (
                <DropIndicator 
                    ref={setNodeRef} 
                    classNames={clsx("w-full h-1 bg-red-500 mt-1", {
                        "opacity-0": isOver,
                        "opacity-100": !isOver
                    })} 
                />
            )}
            <Block key={`${rowIndex}-${colIndex}-${blockIndex}`} {...block} id={sortableId} />
        </div>
    )
}