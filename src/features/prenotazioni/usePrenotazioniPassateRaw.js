import { useQuery } from '@tanstack/react-query';
import { useUser } from '../authentication/useUser';
import { getPrenotazioniPassate } from '../../services/apiPrenotazioni';

export function usePrenotazioniPassateRaw() {
  const { user, isLoading: userLoading, error: errorUser } = useUser();

  const {
    data = [],
    error: errorPrenotazioniPassate,
    isLoading: prenotazioniPassateLoading,
  } = useQuery({
    queryKey: ['prenotazioniPassate'],
    queryFn: () => getPrenotazioniPassate(user.id),
    enabled: !userLoading,
  });

  const prenotazioniPassate = data.map((prenotazione) => {
    return {
      orarioFine: prenotazione.orarioFine,
      orarioInizio: prenotazione.orarioInizio,
      servizio: prenotazione.servizi,
      data: prenotazione.data,
      sede: prenotazione.sedi,
      barbiere: prenotazione.barbers,
      id_sede: prenotazione.id_sede,
      id_servizio: prenotazione.id_servizio,
      id_barber: prenotazione.id_barber,
    };
  });

  return {
    isLoading: userLoading || prenotazioniPassateLoading,
    error: errorUser || errorPrenotazioniPassate,
    noPastAppointments: data.length === 0,
    prenotazioniPassate,
  };
}
