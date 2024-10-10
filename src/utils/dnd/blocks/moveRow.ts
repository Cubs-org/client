export const moveRow = (id, targetRow, blocks) => {
    const groupedBlocks = [...blocks]; // Clona os blocos para não alterar o array original
    const [row, orderX, orderY, blockId] = id.split('-').map(Number); // Extrai os valores do id

    targetRow = Number(targetRow);
    targetRow = row < targetRow ? targetRow - 1 : targetRow;

    const currentRow = groupedBlocks[row - 1];
    const hasBlocksOnOrderY = currentRow[orderX - 1].filter(b => b.id != blockId).length > 0
    const hasBlocksOnOrderX = currentRow.filter((_, i) => i + 1 !== orderX).length > 0;

    const [movedBlock] = groupedBlocks[row - 1][orderX - 1].splice(orderY - 1, 1);

    if (!movedBlock) return blocks;

    movedBlock.row = targetRow;
    movedBlock.orderX = 1;
    movedBlock.orderY = 1;

    if (row < targetRow) {
      if (!hasBlocksOnOrderY && !hasBlocksOnOrderX) {
        for (let i = 1; i <= groupedBlocks.length; i++) {
          if (i > row && i <= targetRow) {
            const groupedRow = groupedBlocks[i - 1];
            // TODO: recursive function - updateRow
            for (let j = 0; j < groupedRow.length; j++) {
              const col = groupedRow[j];
              col.forEach(block => block.row -= 1);
            }
          } 
        }
        groupedBlocks.splice(row - 1, 1); // Remove linha inteira
        groupedBlocks.splice(targetRow - 1, 0, [[movedBlock]]);
      }
    }

    return groupedBlocks;
  };
  