import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewAppointment } from '../../services/apiPrenotazioni';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useCreateAppointment(resetState) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    isPending,
    mutate: createAppointment,
    error,
  } = useMutation({
    mutationFn: createNewAppointment,
    onError: () => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['prenotazioneAttuale'],
      });
      toast.success('Appuntamento creato!');
      navigate('/prenotazioni/attuale');
      resetState();
    },
  });

  return { isPending, createAppointment };
}
