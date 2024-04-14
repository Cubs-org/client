import { formatDistanceToNow, format } from 'date-fns';

export default function updatedAtFormat(value: string | Date): string {
    const date = new Date(value);
    const now = new Date();
    const distanceToNow = formatDistanceToNow(date);

    if (distanceToNow.includes('day')) {
        const daysAgo = parseInt(distanceToNow, 10);
        if (daysAgo <= 1) {
            return `Editado há 1 dia atrás`;
        } else if (daysAgo <= 7) {
            return `Editado há ${daysAgo} dias atrás`;
        } else {
            return `Editado há 1 semana`;
        }
    } else if (distanceToNow.includes('week')) {
        return `Editado há 1 semana`;
    } else if (distanceToNow.includes('month')) {
        const monthsAgo = Math.floor(
            (now.getFullYear() - date.getFullYear()) * 12 +
                (now.getMonth() - date.getMonth())
        );
        if (monthsAgo <= 1) {
            return `Editado há 1 mês`;
        } else {
            return `Editado há ${monthsAgo} meses atrás`;
        }
    } else if (distanceToNow.includes('year')) {
        const yearsAgo = now.getFullYear() - date.getFullYear();
        if (yearsAgo <= 1) {
            return `Editado há 1 ano`;
        } else {
            return `Editado há ${yearsAgo} anos atrás`;
        }
    } else if (distanceToNow.includes('hour')) {
        
        const hoursAgo = parseInt(distanceToNow.replace("about", ""), 10);
        if (hoursAgo <= 1) {
            return `Editado há 1 hora atrás`;
        } else {
            return `Editado há ${hoursAgo} horas atrás`;
        }
    } else if (distanceToNow.includes('minute')) {
        return `Editado há alguns minutos atrás`;
    }
    else if (distanceToNow.includes('second')) {
        return `Editado há alguns segundos atrás`;
    } else {
        return format(date, "dd/MM/yyyy"); // Fallback format
    }
}