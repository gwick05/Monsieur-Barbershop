import { useSignUp } from '../features/authentication/useSignup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import MiniSpinner from '../ui/MiniSpinner';
import Form from '../ui/Form';
import FormRow from '../ui/FormRow';
import Label from '../ui/Label';
import MiniErrore from '../ui/MiniErrore';
import Button from '../ui/Button';
import { strongPasswordRegex } from '../utils/constants';
import { useDarkModeContext } from '../context/DarkModeContext';

function Signup() {
  const { signup, isPending } = useSignUp();
  const { dark } = useDarkModeContext();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    const { nome, cognome, email, password, telefono } = data;
    signup({ nome, cognome, email, password, telefono });
  }

  return (
    <div
      className={` flex h-screen flex-col items-center overflow-auto py-6 ${dark ? 'bg-neutral-900 text-neutral-50 ' : ' bg-neutral-100  text-neutral-700'}  transition-colors duration-500 `}
    >
      <div className="flex  w-[360px] flex-col items-center justify-between">
        <Logo />
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
          <FormRow
            error={
              errors?.email?.message && (
                <MiniErrore error={errors?.email?.message} />
              )
            }
          >
            <Label>Email</Label>
            <input
              defaultValue={''}
              className="rounded-md px-2 py-1 text-neutral-700 ring-1 ring-neutral-700 ring-opacity-50 focus:outline-none focus:ring-opacity-100 "
              type="email"
              name="email"
              {...register('email', {
                required: 'Campo obbligatorio',
                validate: (email) =>
                  !!email.trim() || 'Il campo non accetta spazi bianchi!',
              })}
            />
          </FormRow>
          <FormRow
            error={
              errors?.password?.message && (
                <MiniErrore error={errors?.password?.message} />
              )
            }
          >
            <Label>Password</Label>
            <input
              defaultValue={''}
              className="rounded-md px-2 py-1 text-neutral-700 ring-1 ring-neutral-700 ring-opacity-50 focus:outline-none focus:ring-opacity-100 "
              type="password"
              name="password"
              {...register('password', {
                required: 'Campo obbligatorio',
                validate: (password) =>
                  !!strongPasswordRegex.test(password) ||
                  'La password deve contenere almeno: Almeno una lettera maiuscola, almeno una lettera minuscola, almeno un numero, almeno un carattere speciale tra "@$!%*?&" e deve avere una lunghezza minima di 8 caratteri',
              })}
            />
          </FormRow>
          <FormRow
            error={
              errors?.confermaPassword?.message && (
                <MiniErrore error={errors?.confermaPassword?.message} />
              )
            }
          >
            <Label>Conferma password</Label>
            <input
              className="rounded-md px-2 py-1 text-neutral-700 ring-1 ring-neutral-700 ring-opacity-50 focus:outline-none focus:ring-opacity-100"
              type="password"
              name="confermaPassword"
              {...register('confermaPassword', {
                required: 'Campo obbligatorio',
                validate: (value) =>
                  value === getValues().password ||
                  'Le password non corrispondono',
              })}
            />
          </FormRow>
          <div className="flex flex-col items-center gap-2">
            <Button type="primary" disabled={isPending}>
              {isPending ? <MiniSpinner /> : 'Registrati'}
            </Button>
            <Link to="/login">Hai già un account? Accedi!</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
