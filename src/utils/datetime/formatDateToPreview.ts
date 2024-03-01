import { getMonthNameByNumber } from "./getMonthName";

export function formatDateToPreview(date: string): string {
    const newDate = new Date(date);
  
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1; // Os meses são baseados em zero, então somamos 1
    const year = newDate.getFullYear();
    const hour = newDate.getHours();
    const minute = newDate.getMinutes();
  
    const formattedDate = `${day} de ${
      getMonthNameByNumber(month)
    } de ${year} às ${hour}h${minute}min`;
  
    return formattedDate;
  }