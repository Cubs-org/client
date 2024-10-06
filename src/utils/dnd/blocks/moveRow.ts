export const moveRow = (id, targetRow, blocks) => {
    const gblocks = [...blocks]; // Clona os blocos para não alterar o array original
    const [row, orderX, orderY, blockId] = id.split('-').map(Number); // Extrai os valores do id

    targetRow = Number(targetRow); // Certifica que targetRow é um número

    // Encontra o bloco a ser movido pelo blockId
    const draggedBlockIndex = gblocks.findIndex(block => block.id == blockId);
    if (draggedBlockIndex === -1) return blocks; // Retorna os blocos inalterados se o bloco não for encontrado

    const [movedBlock] = gblocks.splice(draggedBlockIndex, 1); // Remove o bloco que está sendo movido

    // Atualiza a nova linha e reinicializa as ordens do bloco movido
    movedBlock.row = targetRow;
    movedBlock.orderX = 1; // Coloca o bloco movido na primeira coluna
    movedBlock.orderY = 1; // Coloca o bloco movido no topo dessa coluna

    // Recoloca o bloco na nova posição do array
    gblocks.splice(targetRow - 1, 0, movedBlock); // Coloca o bloco movido no targetRow

    // Agora vamos recontar as posições (`row`, `orderX`, `orderY`) de todos os blocos
    gblocks.forEach(block => {
        // 1. Recalcula os `row`s a partir do targetRow
        if (block.row >= targetRow && block.id !== blockId) {
            block.row += 1; // Incrementa o `row` dos blocos abaixo do targetRow
        }

        if (block.row !== row) return; // Pula os blocos que não estão na mesma linha
        // 2. Atualiza os blocos que estão na mesma linha e coluna, mas com orderY maior
        if (block.orderX === orderX && block.orderY > orderY) {
            block.orderY -= 1; // Se houver `orderY` maior, decremente `orderY`
        } else if (block.orderX > orderX) {
            // 3. Se não houver blocos com `orderY` maior, verifica `orderX` maior e decremente
            block.orderX -= 1; // Ajusta `orderX` se não houver `orderY` maior
        }
    });

    return gblocks; // Retorna a lista atualizada de blocos
};
