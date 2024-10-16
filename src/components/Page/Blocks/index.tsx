import {
  DndContext,
    MouseSensor,
    PointerSensor,
    rectIntersection,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import createGroupedBlocks from '../../../utils/dnd/blocks/createGroupedBlocks'
import { DataBlocks, GroupedBlocks as TypeOfGroupedBlocks } from '../../../types/page'
import { moveRow } from '../../../utils/dnd/blocks/moveRow'
import { SortableContext } from '@dnd-kit/sortable'
import { Blocks } from './Blocks'

function detectSensor() {
    const isWebEntry = JSON.parse(sessionStorage.getItem('isWebEntry') as string)
    return isWebEntry ? PointerSensor : TouchSensor
}

function setSensors() {
    const options = {
        activationConstraint: {
            delay: 200,
            tolerance: 5,
        },
    }
    return [useSensor(MouseSensor, options), useSensor(detectSensor(), options)]
}

const generateSortableItems = (blocks) => {
    return blocks.map((block) => {
        const rowIndex = block.row
        const colIndex = block.orderX
        const blockIndex = block.orderY
        const blockId = block.id
        return `${rowIndex}-${colIndex}-${blockIndex}-${blockId}`
    })
}

interface GroupedBlocksProps {
    blocks: DataBlocks[]
}

const handlers = {
    row: (id, target, grouped) => moveRow(id, target, grouped),
}

export const GroupedBlocks = ({ blocks }: GroupedBlocksProps) => {
    const [sortables, setSortables] = useState([])
    const [groupedBlocks, setGroupedBlocks] = useState<TypeOfGroupedBlocks>([])

    const sensors = useSensors(...setSensors())

    const handleDragEnd = ({ active, over }) => {
        const id = active.id
        const [handlerKey, targetRow] = over.id.split('-')

        const updated = handlers[handlerKey](id, targetRow, groupedBlocks)
        setGroupedBlocks([...updated])
    }

    useEffect(() => {
        const data = createGroupedBlocks(blocks) // creating a group of row and cols
        setGroupedBlocks(data)
        setSortables(generateSortableItems(blocks))
    }, [blocks])

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={rectIntersection}
            onDragEnd={handleDragEnd}
        >
            <SortableContext items={sortables}>
                <Blocks
                    key={JSON.stringify(groupedBlocks)}
                    blocks={groupedBlocks}
                />
            </SortableContext>
        </DndContext>
    )
}
