import { useQuery } from '@tanstack/react-query';
import { getServizi } from '../../services/apiPrenotazioni';

export function useServizi() {
  const {
    data: servizi,
    status,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['servizi'],
    queryFn: getServizi,
  });

  return { servizi, status, isLoading, error };
}
