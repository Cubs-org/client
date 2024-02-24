export default function isDateInRange(day, start, end) {
  const currentDate = new Date(day);
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Configura as datas para o fuso horário UTC
  currentDate.setUTCHours(0, 0, 0, 0);
  startDate.setUTCHours(0, 0, 0, 0);
  endDate.setUTCHours(0, 0, 0, 0);

  const isRange = (currentDate >= startDate) && (currentDate <= endDate);

  return isRange;
}