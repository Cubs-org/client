import { DateProps } from "@/interfaces/calendar";

export default function getDays({initialDate, finalDate}:DateProps) {
    const dates = [];
    let startDate, endDate
    startDate = new Date(initialDate);
    endDate = new Date(finalDate);
    while (startDate <= endDate) {
        dates.push(startDate.toISOString().split('T')[0]);
        startDate.setDate(startDate.getDate() + 1);
    }

    return dates;
}