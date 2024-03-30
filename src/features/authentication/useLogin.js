import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin(resetState) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: login,
    isPending,
    status,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      toast.success('Login effettuato correttamente!');
      queryClient.setQueryData(['user'], user.user);
      resetState();
      navigate('/');
    },
    onError: () => {
      toast.error('Nome o password non corretti!');
    },
  });

  return { login, isPending, status };
}
