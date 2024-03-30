//Function that generates the timeblocks available for a certain date based on the already taken timeblocks(already booked appointments), the morning and evening opening hours and the time duration of the service in minutes.

export default function generateTimeBlocks(
  startTime,
  endTime,
  alreadyBooked,
  inc,
  date,
) {
  const selectedDate = new Date(date.startDate);
  selectedDate.setHours(0, 0, 0, 0);
  const todaysDate = new Date();
  todaysDate.setHours(0, 0, 0, 0);

  const timeBlocks = [];
  let currentTime = new Date(startTime);

  while (currentTime < endTime) {
    let isBooked = false;

    for (const interval of alreadyBooked) {
      const possibleFreeSpot = new Date(currentTime);
      possibleFreeSpot.setMinutes(possibleFreeSpot.getMinutes() + inc);

      const [startH, startM] = interval.start.split(':').map(Number);
      const [endH, endM] = interval.end.split(':').map(Number);

      const convStart = new Date(currentTime);
      convStart.setHours(startH, startM, 0, 0);

      const convEnd = new Date(currentTime);
      convEnd.setHours(endH, endM, 0, 0);

      if (possibleFreeSpot > convStart && currentTime < convEnd) {
        isBooked = true;

        currentTime = convEnd;
        currentTime.setMinutes(currentTime.getMinutes() - inc);
        break;
      }
    }

    if (!isBooked) {
      if (selectedDate.getTime() === todaysDate.getTime()) {
        if (
          endTime.getTime() > new Date().getTime() &&
          currentTime.getTime() > new Date().getTime()
        ) {
          timeBlocks.push(
            currentTime.toLocaleTimeString('it-IT', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          );
        }
      } else {
        timeBlocks.push(
          currentTime.toLocaleTimeString('it-IT', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        );
      }
    }

    const breakClause = new Date(currentTime);
    breakClause.setMinutes(breakClause.getMinutes() + inc * 2);
    if (breakClause > endTime) break;
    currentTime.setMinutes(currentTime.getMinutes() + inc);
  }

  return timeBlocks;
}
