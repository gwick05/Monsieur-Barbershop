import { useQuery } from '@tanstack/react-query';
import { getSedi } from '../services/apiSedi';

export function useSedi() {
  const {
    data: sedi,
    status,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['sedi'],
    queryFn: getSedi,
  });

  return { sedi, status, isLoading, error };
}
