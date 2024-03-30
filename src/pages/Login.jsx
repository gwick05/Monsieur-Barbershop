import { useLogin } from '../features/authentication/useLogin';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCarrelloContext } from '../context/CarrelloContext';
import { usePrenotazioneContext } from '../context/PrenotazioneContext';
import Logo from '../ui/Logo';
import MiniSpinner from '../ui/MiniSpinner';
import Form from '../ui/Form';
import FormRow from '../ui/FormRow';
import Label from '../ui/Label';
import Button from '../ui/Button';
import MiniErrore from '../ui/MiniErrore';
import { useDarkModeContext } from '../context/DarkModeContext';

function Login() {
  const { dark } = useDarkModeContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { resetState: resetCart } = useCarrelloContext();
  const { resetState: resetPrenotazioni } = usePrenotazioneContext();
  const { login, isPending } = useLogin(reset);

  function onSubmit(data) {
    const { email, password } = data;
    login({ email, password });
  }
  function reset() {
    resetCart();
    resetPrenotazioni();
  }
  return (
    <div
      className={` flex h-screen flex-col items-center overflow-auto py-6 ${dark ? 'dark bg-neutral-900 text-neutral-50 ' : ' bg-neutral-100  text-neutral-700'}  transition-colors duration-500 `}
    >
      <div className={`flex  flex-col items-center  py-[80px]`}>
        <div className="space-evenly flex w-[360px] flex-col items-center">
          <Logo />
          <Form
            onSubmit={handleSubmit(onSubmit)}
            additionalCss={'items-center'}
          >
            <FormRow
              error={
                errors?.email?.message && (
                  <MiniErrore error={errors?.email?.message} />
                )
              }
            >
              <Label> Email</Label>
              <input
                defaultValue={'gaetanocesano@gmail.com'}
                className="rounded-md px-2 py-1 text-neutral-700 ring-1 ring-neutral-700 ring-opacity-50 focus:outline-none focus:ring-opacity-100"
                disabled={isPending}
                type="email"
                name="email"
                {...register('email', { required: 'Campo obbligatorio' })}
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
                defaultValue={'Prova123456789!'}
                className="rounded-md px-2 py-1 text-neutral-700 ring-1 ring-neutral-700 ring-opacity-50 focus:outline-none focus:ring-opacity-100 "
                disabled={isPending}
                type="password"
                name="password"
                {...register('password', {
                  required: 'Campo obbligatorio',
                })}
              />
            </FormRow>
            <div className="flex flex-col items-center gap-2">
              <Button disabled={isPending} type="primary">
                {!isPending ? 'Log in' : <MiniSpinner />}
              </Button>
              <Link to="/signup">Non hai un account? Registrati</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
