import { DataBlocks, GroupedBlocks } from "@/types/page";

type RowRules = {
    y: boolean;
    x: boolean;
};

export function moveDown(
    grouped: GroupedBlocks,
    movedData: {
        row,
        orderX,
        orderY,
        blockId
    },
    targetRow: number,
    currentRow: DataBlocks[][],
    rules: RowRules,
    movedBlock: DataBlocks
) {
    const { row, orderX } = movedData;
    // Defines a conditional to only block in row
    if (!rules.y && !rules.x) {
        for (let i = 1; i <= grouped.length; i++) {
          if (i > row && i <= targetRow) {
            const groupedRow = grouped[i - 1];
            // TODO: recursive function - updateRow
            for (let j = 0; j < groupedRow.length; j++) {
              const col = groupedRow[j];
              col.forEach(block => block.row -= 1);
            }
          } 
        }
        grouped.splice(row - 1, 1); // Remove row
      }
      // Verifies if there are blocks in the same column (orderY)
      else if (rules.y) {
        const updatedColumn = currentRow[orderX - 1];

        // Update column indexes from moved block
        updatedColumn.forEach((block, i) => {
          block.orderY = i + 1;
        });
      } 
      // Verifies if there are blocks in the same row (orderX)
      else if (!rules.y && rules.x) {
        // Update column indexes from moved block
        currentRow.forEach(col => {
          col.forEach(block => block.orderX -= 1);
        });
      }

      // Insert block in target row
      grouped.splice(targetRow - 1, 0, [[movedBlock]]);
}