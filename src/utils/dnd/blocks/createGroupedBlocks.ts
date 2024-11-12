export default function createGroupedBlocks(blocks) {
    return blocks.reduce((acc, cur) => {
        const rowIndex = cur.row - 1
        const colIndex = cur.orderX - 1
        const blockIndex = cur.orderY - 1
        if (!acc[rowIndex]) acc[rowIndex] = []
        if (!acc[rowIndex][colIndex]) acc[rowIndex][colIndex] = []
        if (!acc[rowIndex][colIndex][blockIndex])
            acc[rowIndex][colIndex][blockIndex] = {}
        acc[rowIndex][colIndex][blockIndex] = cur
        return acc
    }, [])
}
