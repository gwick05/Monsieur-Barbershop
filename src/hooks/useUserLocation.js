import { useQuery } from '@tanstack/react-query';
import { getUserLocation } from '../utils/helpers/getUserLocation';

export function useUserLocation() {
  const {
    data: userLocation,
    status,
    isLoading,
  } = useQuery({
    queryKey: ['user-location'],
    queryFn: getUserLocation,
  });

  return { userLocation, status, isLoading };
}
