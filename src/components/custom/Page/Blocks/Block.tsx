import clsx from 'clsx';
import { LuGripVertical } from 'react-icons/lu';
import { DataBlocks } from '../../../../types/page';
import { CSSProperties } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { RenderBlocks } from './RenderBlocks';

export const Block = ({ id, data = { align: 'left' }, ...rest }: DataBlocks) => {

    const {
        setNodeRef,
        attributes,
        listeners,
        isDragging,
    } = useSortable({
        id
    })

    const styles: CSSProperties = {
        opacity: isDragging ? 0.5 : 1
    };

    return (
        <div
            ref={setNodeRef}
            className={clsx('relative max-w-full w-full h-fit p-1 flex flex-grow items-start rounded-md group')}
            style={{
                // minWidth: `${data.width}%`,
                // width: `${data.width}%`,
                ...styles
            }}
        >
            <button {...attributes} {...listeners}>
                <LuGripVertical
                    size={24}
                    className="opacity-0 cursor-grab rounded-md hover:bg-light-200 text-light-900 dark:hover:bg-dark-800 dark:text-dark-100 text-xs font-bold group-hover:opacity-100"
                />
            </button>
            <div className="w-full relative">
                :{id}:{data.width}:
                <RenderBlocks {...rest} />
            </div>
        </div>
    );
};