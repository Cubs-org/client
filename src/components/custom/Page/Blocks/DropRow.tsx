import { DropIndicator } from './DropIndicator';
import clsx from 'clsx';
import { useDroppable } from '@dnd-kit/core';
import { DropCol } from './DropCol';

interface DropBlocksProps {
    rowIndex: number
    row: any
}

export const DropRow = ({ row, rowIndex }: DropBlocksProps) => {
    const {
        setNodeRef: setBfRowRef,
        isOver: isBfRowOver
    } = useDroppable({
        id: `row-${rowIndex + 1}`
    });

    const {
        setNodeRef: setAfColRef,
        isOver: isAfColOver
    } = useDroppable({
        id: `right:col-${rowIndex + 1}`
    });

    return (
        <div className="max-w-full flex flex-col flex-grow">
          <DropIndicator classNames={clsx("w-full h-1 bg-purple-500 opacity-0", {
            "opacity-0": !isBfRowOver,
            "opacity-100": isBfRowOver
          })} ref={setBfRowRef} />
          <div className="flex justify-between">
            {row.map((col, _c) => {
              const isCol = row.length > 1;
              return (
                <DropCol key={_c} isCol={isCol} rowIndex={rowIndex} colIndex={_c} col={col} />
              );
            })}
            <DropIndicator classNames={clsx("min-w-[5px] bg-purple-500 opacity-0", {
                "opacity-0": !isAfColOver,
                "opacity-100": isAfColOver
            })} ref={setAfColRef} />
          </div>
        </div>
    )
}