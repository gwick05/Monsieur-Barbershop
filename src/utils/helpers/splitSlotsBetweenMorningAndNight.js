//Function that takes an array of time intervals/slots and splits it in two arrays one for the intervals that belong to the morning opening hours and one for the intervals that belong to the evening opening hours.
export default function splitSlotsBetweenMorningAndNight(
  alreadyBookedSlots,
  morningStart,
  morningEnd,
  eveningStart,
  eveningEnd,
) {
  const isBetweenTimeRange = (time, start, end) => {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    const startMinutes = start.hours * 60 + start.minutes;
    const endMinutes = end.hours * 60 + end.minutes;
    return totalMinutes >= startMinutes && totalMinutes <= endMinutes;
  };

  const [morningSlots, nightSlots] = alreadyBookedSlots.reduce(
    (acc, interval) => {
      if (
        isBetweenTimeRange(interval.start, morningStart, morningEnd) ||
        isBetweenTimeRange(interval.end, morningStart, morningEnd)
      ) {
        acc[0].push(interval);
      } else if (
        isBetweenTimeRange(interval.start, eveningStart, eveningEnd) ||
        isBetweenTimeRange(interval.end, eveningStart, eveningEnd)
      ) {
        acc[1].push(interval);
      }
      return acc;
    },
    [[], []],
  );

  return [morningSlots, nightSlots];
}
