export default function parseFormula(formula) {
    // Expressão regular para encontrar o texto e a cor na fórmula
    const regex = /(?:text=([^;]+);)?(?:color=([^;]+))?/;

    // Executa a regex na fórmula
    const matches = formula.match(regex);

    // Extrai o texto e a cor dos resultados da regex
    let text = matches[1] || formula; // Se não houver correspondência para 'text', usa a fórmula completa como texto
    let color = matches[2] || null; // Se não houver correspondência para 'color', define como null

    text = text.replace(/text=/, ''); // Remove o prefixo 'text='
    // Retorna um objeto com o texto e a cor
    return { text, color };
}