import { useMutation } from '@tanstack/react-query';
import { signup as signUpApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useSignUp() {
  const navigate = useNavigate();
  const {
    mutate: signup,
    isPending,
    status,
  } = useMutation({
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success(
        "Registrazione fatta! Ti arrivera' un'email per la conferma.",
        navigate('/'),
      );
    },
    onError: () => {
      toast.error('Non è stato possibile effettuare la registrazione!');
    },
  });

  return { signup, isPending, status };
}
