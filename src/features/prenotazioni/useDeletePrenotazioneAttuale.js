import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePrenotazione } from '../../services/apiPrenotazioni';
import toast from 'react-hot-toast';

export function useDeletePrenotazioneAttuale() {
  const queryClient = useQueryClient();
  const {
    isPending,
    mutate: deletePrenotazioneAttuale,
    error,
  } = useMutation({
    mutationFn: ({ userId, prenotazioneId }) =>
      deletePrenotazione(userId, prenotazioneId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prenotazioneAttuale'] });
      toast.success('Prenotazione cancellata!');
    },
    onError: () => {
      toast.error(error);
    },
  });

  return { isPending, deletePrenotazioneAttuale };
}
