import { usePrenotazioniPassateRaw } from './usePrenotazioniPassateRaw';
import { useFilteredAndSortedData } from '../../hooks/useFilterData';
import { filterFn, sortSwitchFn } from './prenotazioniPassateFilterNSort';
import { filterIdenticalObjects } from '../../utils/helpers/filterIdenticalObjectsOut';

export function usePrenotazioniPassate() {
  const {
    isLoading,
    error,
    noPastAppointments,
    prenotazioniPassate: data = [],
  } = usePrenotazioniPassateRaw();

  const sedi = data
    ? filterIdenticalObjects(data.map((prenotazione) => prenotazione.sede))
    : [];
  const barbieri = data
    ? filterIdenticalObjects(data.map((prenotazione) => prenotazione.barbiere))
    : [];
  const servizi = data
    ? filterIdenticalObjects(data.map((prenotazione) => prenotazione.servizio))
    : [];
  const filteredPrenotazioni = useFilteredAndSortedData({
    data: [...data],
    sortSwitchFn: sortSwitchFn,
    filterBy: 'filterSedi',
    filterFn: filterFn,
  });

  return {
    isLoading,
    error,
    noPastAppointments,
    prenotazioniPassate: filteredPrenotazioni,
    sedi,
    barbieri,
    servizi,
  };
}
