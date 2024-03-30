import { getGiorniNonLavorativi } from '../utils/helpers/getGiorniNonLavorativi';
import { filterIdenticalObjects } from '../utils/helpers/filterIdenticalObjectsOut';
import { formatDate } from '../utils/helpers/formatDate';
import { isInOpenTimeRange } from '../utils/helpers/isInOpenTimeRange';
import { checkDateInIntervals } from '../utils/helpers/checkDateBetweenIntervals';

//Hook that computes the dates the barbershop isn't open and also if the barbershop is open at the current time
export function useCheckDateAndTimeAvailability(sede) {
  //We deconstruct the working hours into interval arrays
  const { mattina, pomeriggio } = sede.oreLavoro;

  //We get the endEvening object that contains the endHour and endMinutes of the evening workhour
  const {
    pomeriggio: { endEvening },
  } = sede.oreLavoro;

  //We get todays date
  const today = new Date();

  //We set a variable that is gonna keep track if the current subsidiary should be displayed as "OPENED" or not.
  let isInTimeRange = false;

  //We compute all the dates that should be disabled based on the days of the week the subsidiary is closed.
  const giorniNonLavorativi = getGiorniNonLavorativi(
    sede.giorniNonLavorativi,
    sede.dateChiusura,
  );

  //Compute array of disabled dates based on the days of the week the subsidiary is closed and all the other dates and date intervals the "OWNER" might want to close, for different reasons
  const dateChiusura = filterIdenticalObjects([
    ...giorniNonLavorativi,
    ...sede.dateChiusura,
  ]);

  //Check if todays date falls between the dateChiusura. In case it is the subsidiary should be displayed as "CLOSED" so we return false
  const isBetweenDateChiusura = checkDateInIntervals(
    formatDate(today),
    dateChiusura,
  );

  if (isBetweenDateChiusura) isInTimeRange = false;

  //We check if the current hour is past the evening closing hour of the subsidiary. If that's the case the subsidiary should also be displayed as "CLOSED" so again, we return false
  const isOverWorkHour = today.getHours() > endEvening.hours;

  if (isOverWorkHour) {
    isInTimeRange = false;
    dateChiusura.push({
      startDate: formatDate(today),
      endDate: formatDate(today),
    });
  }

  //Finally we check if the current time is between the opened hours of the subsidiary, then we check if today isn't between the closing dates, if that's the case we set the isInTimeRange to true so the subsidiary can be shown as "OPEN"
  if (isInOpenTimeRange(mattina, pomeriggio) && !isBetweenDateChiusura)
    isInTimeRange = true;

  return { isInTimeRange, dateChiusura };
}
