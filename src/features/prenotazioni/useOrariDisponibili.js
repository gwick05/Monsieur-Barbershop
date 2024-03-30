import { useQuery } from '@tanstack/react-query';
import { getAlreadyTakenSlotsForDate } from '../../services/apiPrenotazioni';

export function useOrariDisponibili(barberId, date) {
  const {
    data: alreadyTakenSlots,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['alreadyTakenSlots', barberId, date],
    queryFn: () => getAlreadyTakenSlotsForDate(barberId, date),
  });

  return { alreadyTakenSlots, error, isLoading };
}
