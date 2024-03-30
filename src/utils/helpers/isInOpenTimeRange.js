//Function that checks if the current time falls between the morning and evening opening hours

export const isInOpenTimeRange = (morning, evening) => {
  const currentTime = new Date();
  const { startMorning, endMorning } = morning;
  const { startEvening, endEvening } = evening;

  const endEveningTime = new Date();
  endEveningTime.setHours(endEvening.hours, endEvening.minutes, 0, 0);
  const startEveningTime = new Date();
  startEveningTime.setHours(startEvening.hours, startEvening.minutes, 0, 0);

  const startMorningTime = new Date();
  startMorningTime.setHours(startMorning.hours, startMorning.minutes, 0, 0);
  const endMorningTime = new Date();
  endMorningTime.setHours(endMorning.hours, endMorning.minutes, 0, 0);

  return (
    (currentTime >= startMorningTime && currentTime <= endMorningTime) ||
    (currentTime >= startEveningTime && currentTime <= endEveningTime)
  );
};
