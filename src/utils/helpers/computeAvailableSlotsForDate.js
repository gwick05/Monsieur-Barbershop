import splitSlotsBetweenMorningAndNight from './splitSlotsBetweenMorningAndNight';
import generateTimeBlocks from './generateTimeBloks';
//Function that computes the available slots for a service for a certain day
export default function computeAvailableSlotsForDate(
  alreadyBooked,
  morningHours,
  eveningHours,
  serviceTime,
  date,
) {
  const { startMorning, endMorning } = morningHours;
  const { startEvening, endEvening } = eveningHours;
  const startMorningHour = new Date();
  startMorningHour.setHours(startMorning.hours, startMorning.minutes, 0, 0);
  const endMorningHour = new Date();
  endMorningHour.setHours(endMorning.hours, endMorning.minutes, 0, 0);

  const startEveningHour = new Date();
  startEveningHour.setHours(startEvening.hours, startEvening.minutes, 0, 0);
  const endEveningHour = new Date();
  endEveningHour.setHours(endEvening.hours, endEvening.minutes, 0, 0);

  const [morningSlots, eveningSlots] = splitSlotsBetweenMorningAndNight(
    alreadyBooked.map((slot) => {
      return {
        start: slot.orarioInizio.slice(0, -3),
        end: slot.orarioFine.slice(0, -3),
      };
    }),
    { hours: startMorning.hours, minutes: startMorning.minutes },
    { hours: endMorning.hours, minutes: endMorning.minutes },
    { hours: startEvening.hours, minutes: startEvening.minutes },
    { hours: endEvening.hours, minutes: endEvening.minutes },
  );

  const availableMorningSlots = generateTimeBlocks(
    startMorningHour,
    endMorningHour,
    morningSlots,
    +serviceTime,
    date,
  );
  const availableEveningSlots = generateTimeBlocks(
    startEveningHour,
    endEveningHour,
    eveningSlots,
    +serviceTime,
    date,
  );
  return [...availableMorningSlots, ...availableEveningSlots];
}
