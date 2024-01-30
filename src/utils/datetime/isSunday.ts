export default function isSunday(dateString) {
  // Cria um objeto Date a partir da string
  const date = new Date(dateString);
  
  // Obtém o dia da semana (0 é domingo, 1 é segunda-feira, ..., 6 é sábado)
  const dayOfWeek = date.getDay();
  
  // Verifica se o dia da semana é domingo (0)
  return dayOfWeek === 6;
}