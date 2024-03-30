import { useQuery } from '@tanstack/react-query';
import { getContatti } from '../../services/apiContatti';

export function useContatti() {
  const {
    data: contatti,
    status,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['contatti'],
    queryFn: getContatti,
  });

  return { contatti, status, isLoading, error };
}
