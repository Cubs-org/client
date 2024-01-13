import { getMonthNameByNumber } from "./getMonthName";

export function formatDateToPreview(date: string): string {
    const data = new Date(date);
  
    const dia = data.getDate();
    const mes = data.getMonth() + 1; // Os meses são baseados em zero, então somamos 1
    const ano = data.getFullYear();
    const hora = data.getHours();
    const minuto = data.getMinutes();
  
    const dataFormatada = `${dia} de ${
      getMonthNameByNumber(mes)
    } de ${ano} às ${hora}h${minuto}min`;
  
    return dataFormatada;
  }