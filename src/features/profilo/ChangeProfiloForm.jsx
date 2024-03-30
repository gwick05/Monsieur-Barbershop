import { useForm } from 'react-hook-form';
import { useUpdateUser } from '../authentication/useUpdateUser';
import Spinner from '../../ui/Spinner';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import MiniErrore from '../../ui/MiniErrore';
import Label from '../../ui/Label';
import Button from '../../ui/Button';
import MiniSpinner from '../../ui/MiniSpinner';

function ChangeProfiloForm({ setIsUpdatingUser, user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { updateUser, isPending: isLoadingUpdatingUser } =
    useUpdateUser(setIsUpdatingUser);

  function onSubmit(data) {
    updateUser({
      nome: data.nome,
      cognome: data.cognome,
      numero: data.telefono,
    });
  }

  if (isLoadingUpdatingUser) {
    return <Spinner />;
  } else {
    return (
      <Form onSubmit={handleSubmit(onSubmit)} additionalCss={'items-center'}>
        <FormRow
          error={
            errors?.nome?.message && (
              <MiniErrore error={errors?.nome?.message} />
            )
          }
        >
          <Label>Nome</Label>
          <input
            defaultValue={user.user_metadata.nome}
            className="rounded-md px-2 py-1 text-neutral-700 ring-1 ring-neutral-700 ring-opacity-50 focus:outline-none focus:ring-opacity-100 "
            type="text"
            name="nome"
            {...register('nome', {
              required: 'Campo obbligatorio',
              validate: (nome) =>
                !!nome.trim() || 'Il campo non accetta spazi bianchi!',
            })}
          />
        </FormRow>
        <FormRow
          error={
            errors?.cognome?.message && (
              <MiniErrore error={errors?.cognome?.message} />
            )
          }
        >
          <Label>Cognome</Label>
          <input
            defaultValue={user.user_metadata.cognome}
            className="rounded-md px-2 py-1 text-neutral-700 ring-1 ring-neutral-700 ring-opacity-50 focus:outline-none focus:ring-opacity-100 "
            type="text"
            name="cognome"
            {...register('cognome', {
              required: 'Campo obbligatorio',
              validate: (cognome) =>
                !!cognome.trim() || 'Il campo non accetta spazi bianchi!',
            })}
          />
        </FormRow>
        <FormRow
          error={
            errors?.telefono?.message && (
              <MiniErrore error={errors?.telefono?.message} />
            )
          }
        >
          <Label>Numero</Label>
          <input
            defaultValue={user.user_metadata.numero}
            className="rounded-md px-2 py-1 text-neutral-700 ring-1 ring-neutral-700 ring-opacity-50 focus:outline-none focus:ring-opacity-100 "
            type="tel"
            name="numeroTelefono"
            {...register('telefono', {
              required: 'Campo obbligatorio',
              validate: (tel) =>
                !!tel.trim() || 'Il campo non accetta spazi bianchi!',
            })}
          />
        </FormRow>
        <div className="flex items-center gap-4">
          <Button type="primary" disabled={isLoadingUpdatingUser}>
            {isLoadingUpdatingUser ? <MiniSpinner /> : 'Conferma'}
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setIsUpdatingUser(false);
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

export default ChangeProfiloForm;
