//Function that gets an array of "days" as indexes (e.g 0/Sunday, 1/Monday, 2/Tuesday, 3/Wednesday, 4/Thursday, 5/Friday, 6/Saturday) and based on these days calculates all the dates of those specified weekdays from today to one year later. Function used to get all the closing dates based on the weekdays the business is closed (e.g. Sunday)

export function getGiorniNonLavorativi(giorni) {
  const today = new Date();
  const oneYearLater = new Date(today);
  oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

  const targetDaysSet = new Set(giorni);

  const dates = [];
  const current = new Date(today);

  while (current <= oneYearLater) {
    if (targetDaysSet.has(current.getDay())) {
      const dateString = current.toISOString().slice(0, 10);
      dates.push({ startDate: dateString, endDate: dateString });
    }
    current.setDate(current.getDate() + 1);
  }

  return dates;
}
