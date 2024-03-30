import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export function useLogout(reset) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: logout,
    isPending,
    status,
  } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      reset();
      navigate('/login', { replace: true });
    },
  });

  return { logout, isPending, status };
}
