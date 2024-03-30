function isDateInRange(date, interval) {
  const startDate = new Date(interval.startDate);
  const endDate = new Date(interval.endDate);
  return date >= startDate && date <= endDate;
}

//Function that checks if todays date falls between any date interval in an array of date intervals (e.g if todays date 14/03/2024 falls between 05/03/2024-20/03/2024 and it returns a boolean)
export function checkDateInIntervals(date, intervals) {
  const currentDate = new Date(date);
  for (const interval of intervals) {
    if (isDateInRange(currentDate, interval)) {
      return true;
    }
  }
  return false;
}
