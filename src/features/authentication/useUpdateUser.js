import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser as updateUserApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useUpdateUser(onUpdateUser) {
  const queryClient = useQueryClient();
  const {
    mutate: updateUser,
    isPending,
    status,
  } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      toast.success('Profilo modificato correttamente');
      onUpdateUser(false);
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: () => {
      toast.error('Errore: Non e stato possibile modificare il profilo!');
    },
  });

  return { updateUser, isPending, status };
}
