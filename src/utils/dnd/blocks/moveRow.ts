import { GroupedBlocks } from '@/types/page'
import { moveDown } from './row/moveDown'

type handlerMoveRow = (
    id: string,
    targetRow: number,
    groupedBlocks: GroupedBlocks
) => GroupedBlocks

export const moveRow: handlerMoveRow = (id, targetRow, grouped) => {
    const groupedBlocks = [...grouped] // Clona os blocos para não alterar o array original
    const [row, orderX, orderY, blockId] = id.split('-').map(Number) // Extrai os valores do id

    const currentRow = groupedBlocks[row - 1]
    // Verifica se há algum bloco na mesma linha e coluna que o bloco se encontra - Para realocação
    const hasBlocksOnOrderY =
        currentRow[orderX - 1].filter((b) => +b.id != blockId).length > 0
    // Verifica se há colunas na linha (desconsiderando claro, a coluna do bloco atual)
    const hasBlocksOnOrderX =
        currentRow.filter((_, i) => i + 1 !== orderX).length > 0

    targetRow = Number(targetRow)
    const isRemovedRow =
        row < targetRow && !hasBlocksOnOrderY && !hasBlocksOnOrderX
    targetRow = isRemovedRow ? targetRow - 1 : targetRow

    const [movedBlock] = groupedBlocks[row - 1][orderX - 1].splice(
        orderY - 1,
        1
    )

    if (!movedBlock) return grouped

    movedBlock.row = targetRow
    movedBlock.orderX = 1
    movedBlock.orderY = 1

    // Verify direction of movement
    if (row < targetRow) {
        moveDown(
            groupedBlocks,
            { row, orderX, orderY, blockId },
            targetRow,
            currentRow,
            { y: hasBlocksOnOrderY, x: hasBlocksOnOrderX },
            movedBlock
        )
    }

    return groupedBlocks
}
