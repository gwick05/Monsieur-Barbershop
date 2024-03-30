import { useQuery } from '@tanstack/react-query';
import { useUser } from '../authentication/useUser';
import { getPrenotazioneAttuale } from '../../services/apiPrenotazioni';

export function usePrenotazioneAttuale() {
  const { user, isLoading: userLoading, error: errorUser } = useUser();

  const {
    isLoading: isLoadingPrenAtt,
    data: [prenotazione] = [],
    error: errorPrenotazioneAttuale,
  } = useQuery({
    queryKey: ['prenotazioneAttuale'],
    queryFn: () => getPrenotazioneAttuale(user.id),
    enabled: !userLoading,
  });

  return {
    id_user: user?.id,
    id_prenotazione: prenotazione?.id,
    isLoading: userLoading || isLoadingPrenAtt,
    error: errorUser || errorPrenotazioneAttuale,
    noAppointment: prenotazione ? false : true,
    pren: {
      orarioFine: prenotazione?.orarioFine,
      orarioInizio: prenotazione?.orarioInizio,
      servizio: prenotazione?.servizi,
      data: prenotazione?.data,
      sede: prenotazione?.sedi,
      barbiere: prenotazione?.barbers,
    },
  };
}
