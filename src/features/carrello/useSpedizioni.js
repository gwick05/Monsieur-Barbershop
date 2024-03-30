import { useQuery } from '@tanstack/react-query';
import { getSpedizioni } from '../../services/apiCart';

export function useSpedizioni() {
  const {
    data: spedizioni,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['spedizioni'],
    queryFn: getSpedizioni,
  });

  return { spedizioni, isLoading, error };
}
