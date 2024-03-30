import { useQuery } from '@tanstack/react-query';
import { getBarbers } from '../../services/apiPrenotazioni';

export function useBarbers() {
  const {
    data: barbers,
    status,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['barbers'],
    queryFn: getBarbers,
  });

  return { barbers, status, isLoading, error };
}
