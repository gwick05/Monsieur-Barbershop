import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePassword as updatePasswordApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useChangePassword(onChangePassword) {
  const queryClient = useQueryClient();
  const {
    mutate: updatePassword,
    isPending,
    status,
  } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: () => {
      toast.success('Password cambiata correttamente');
      onChangePassword(false);
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: () => {
      toast.error('Errore: Non e stato possibile modificare password!');
    },
  });

  return { updatePassword, isPending, status };
}
