import { DateProps } from "@/interfaces/calendar";

export default function rangeDifferenceBetweenDates({initialDate, finalDate}:DateProps) {
  const start = +new Date(initialDate);
  const end = +new Date(finalDate);
  return (end - start)/(1000 * 60 * 60 * 24) + 1;
}