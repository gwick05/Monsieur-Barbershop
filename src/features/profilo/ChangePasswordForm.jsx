import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Label from '../../ui/Label';
import { strongPasswordRegex } from '../../utils/constants';
import { useChangePassword } from '../authentication/useChangePassword';
import { useForm } from 'react-hook-form';
import MiniErrore from '../../ui/MiniErrore';
import MiniSpinner from '../../ui/MiniSpinner';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';

function ChangePasswordForm({ setIsChangingPassword }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const { updatePassword, isPending: isLoadingChangingPassword } =
    useChangePassword(setIsChangingPassword);

  function onSubmit(data) {
    const { nuovaPassword } = data;
    updatePassword(nuovaPassword);
  }

  if (isLoadingChangingPassword) {
    return <Spinner />;
  } else {
    return (
      <Form onSubmit={handleSubmit(onSubmit)} additionalCss={'items-center'}>
        <FormRow
          error={
            errors?.nuovaPassword?.message && (
              <MiniErrore error={errors?.nuovaPassword?.message} />
            )
          }
        >
          <Label>Nuova password</Label>
          <input
            className="rounded-md px-2 py-1 text-neutral-700 ring-1 ring-neutral-700 ring-opacity-50 focus:outline-none focus:ring-opacity-100 "
            type="password"
            name="nuovaPassword"
            {...register('nuovaPassword', {
              required: 'Campo obbligatorio',
              validate: (nuovaPassword) =>
                strongPasswordRegex.test(nuovaPassword) ||
                'La password deve contenere almeno: Almeno una lettera maiuscola, almeno una lettera minuscola, almeno un numero, almeno un carattere speciale tra "@$!%*?&" e deve avere una lunghezza di almeno 8 caratteri',
            })}
          />
        </FormRow>
        <FormRow
          error={
            errors?.confermaNuovaPassword?.message && (
              <MiniErrore error={errors?.confermaNuovaPassword?.message} />
            )
          }
        >
          <Label>Conferma nuova password </Label>
          <input
            className="rounded-md px-2 py-1 text-neutral-700 ring-1 ring-neutral-700 ring-opacity-50 focus:outline-none focus:ring-opacity-100 "
            type="password"
            name="confermaNuovaPassword"
            {...register('confermaNuovaPassword', {
              required: 'Campo obbligatorio',
              validate: (confermaNuovaPassword) =>
                confermaNuovaPassword === getValues().nuovaPassword ||
                'I campi non coincidono',
            })}
          />
        </FormRow>
        <div className="flex items-center gap-4">
          <Button type="primary" disabled={isLoadingChangingPassword}>
            {isLoadingChangingPassword ? <MiniSpinner /> : 'Conferma'}
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setIsChangingPassword(false);
            }}
            type="secondary"
          >
            Annulla
          </Button>
        </div>
      </Form>
    );
  }
}

export default ChangePasswordForm;
