export default function isDateInRange(day, start, end) {
  const currentDate = new Date(day);
  const startDate = new Date(start);
  const endDate = new Date(end);

  return currentDate >= startDate && currentDate <= endDate;
};