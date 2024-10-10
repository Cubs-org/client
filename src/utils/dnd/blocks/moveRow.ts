export const moveRow = (id, targetRow, blocks) => {
    const gblocks = [...blocks]; // Clona os blocos para não alterar o array original
    const [row, orderX, orderY, blockId] = id.split('-').map(Number); // Extrai os valores do id
    
    console.log('>> ', row, orderX, orderY, blockId , ':', targetRow);

    const [movedBlock] = gblocks[row - 1][orderX - 1].splice(orderY - 1, 1);

    console.log('moved: ', movedBlock);

    return gblocks;
  };
  