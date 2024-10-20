import { GroupedBlocks } from "@/types/page";

type handlerMoveRow = (id: string, targetRow: number, groupedBlocks: GroupedBlocks) => GroupedBlocks;

// TODO: VERIFICAR O PQ DA LINHA ESTAR SENDO COTADA COMO ANTERIOR E DE NÃO SPLITAR A COLUNAS DEPOIS DE REMOVIDO O ÚLTIMO
export const moveRow: handlerMoveRow = (id, targetRow, grouped) => {
    const groupedBlocks = [...grouped]; // Clona os blocos para não alterar o array original
    const [row, orderX, orderY, blockId] = id.split('-').map(Number); // Extrai os valores do id

    const currentRow = groupedBlocks[row - 1];
    // Verifica se há algum bloco na mesma linha e coluna que o bloco se encontra - Para realocação
    const hasBlocksOnOrderY = currentRow[orderX - 1].filter(b => +b.id != blockId).length > 0;
    // Verifica se há colunas na linha (desconsiderando claro, a coluna do bloco atual)
    const hasBlocksOnOrderX = currentRow.filter((_, i) => i + 1 !== orderX).length > 0;

    targetRow = Number(targetRow);
    targetRow = row < targetRow ? targetRow - 1 : targetRow;

    const [movedBlock] = groupedBlocks[row - 1][orderX - 1].splice(orderY - 1, 1);

    if (!movedBlock) return grouped;

    movedBlock.row = targetRow;
    movedBlock.orderX = 1;
    movedBlock.orderY = 1;

    // Verify direction of movement
    if (row < targetRow) {
      // Defines a conditional to only block in row
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
        groupedBlocks.splice(row - 1, 1); // Remove row
      }
      // Verifies if there are blocks in the same column (orderY)
      else if (hasBlocksOnOrderY && !hasBlocksOnOrderX) {
        const updatedColumn = currentRow[orderX - 1];

        // Update column indexes from moved block
        updatedColumn.forEach((block, i) => {
          block.orderY = i + 1;
        });
      } 
      // Verifies if there are blocks in the same row (orderX)
      else if (!hasBlocksOnOrderY && hasBlocksOnOrderX) {
        // Update column indexes from moved block
        currentRow.forEach((col, i) => {
          col.forEach(block => block.orderX = i + 1);
        });
      }

      // Insert block in target row
      groupedBlocks.splice(targetRow - 1, 0, [[movedBlock]]);
    }

    return groupedBlocks;
  };
  