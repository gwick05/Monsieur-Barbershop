import { useEffect, useState } from 'react';
import { useLogout } from '../features/authentication/useLogout';
import { useUser } from '../features/authentication/useUser';
import { useCarrelloContext } from '../context/CarrelloContext';
import { usePrenotazioneContext } from '../context/PrenotazioneContext';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit } from 'react-icons/fa';
import Spinner from '../ui/Spinner';
import MiniSpinner from '../ui/MiniSpinner';
import Button from '../ui/Button';
import ChangePasswordForm from '../features/profilo/ChangePasswordForm';
import ChangeProfiloForm from '../features/profilo/ChangeProfiloForm';
import PageHeader from '../ui/PageHeader';
import Modal from '../ui/Modal';

function Profilo() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const navigate = useNavigate();
  const { isLoading: isLoadingUser, user, isAuthenticated } = useUser();
  const { resetState: resetCart } = useCarrelloContext();
  const { resetState: resetStatePrenotazione } = usePrenotazioneContext();
  const { logout, isPending: isLoggingOut } = useLogout(reset);

  function reset() {
    resetStatePrenotazione();
    resetCart();
  }

  useEffect(() => {
    if (!isAuthenticated && !isLoadingUser) navigate('/signup');
  }, [isAuthenticated, navigate, isLoadingUser]);

  if (isLoadingUser) {
    return <Spinner />;
  } else if (!isAuthenticated) {
    return null;
  } else {
    return (
      <div className="relative flex h-full w-full flex-col items-center px-4">
        <PageHeader additionalCss={'self-start'}>Profilo</PageHeader>
        <div className="flex items-start justify-start gap-6  rounded-lg border-2 border-neutral-500 border-opacity-10  bg-neutral-300 px-6 py-4 shadow-lg  dark:border-opacity-20 dark:bg-neutral-700">
          <div className="flex max-w-xl  flex-col gap-6">
            <ul className="flex flex-col gap-6 text-4xl">
              <li>
                <span className="font-bold">Nome: </span>
                {user.user_metadata.nome}
              </li>
              <li>
                <span className="font-bold">Cognome: </span>
                {user.user_metadata.cognome}
              </li>
              <li>
                <span className="font-bold"> Numero: </span>
                {user.user_metadata.numero}
              </li>
              <li>
                <span className="font-bold">Email: </span> {user.email}
              </li>
            </ul>
            {!isChangingPassword && (
              <div className="flex gap-4  text-2xl">
                <Button
                  type="primary"
                  disabled={isLoggingOut}
                  onClick={() => logout({ reset })}
                >
                  {isLoggingOut ? <MiniSpinner /> : 'Log out'}
                </Button>
                <Button
                  type="secondary"
                  onClick={() => {
                    setIsChangingPassword((isChanging) => !isChanging);
                  }}
                >
                  Cambia password
                </Button>
              </div>
            )}
            {isChangingPassword && (
              <Modal close={() => setIsChangingPassword(false)}>
                <ChangePasswordForm
                  onChangePassword={setIsChangingPassword}
                  setIsChangingPassword={setIsChangingPassword}
                />
              </Modal>
            )}
            {isUpdatingUser && (
              <Modal close={() => setIsUpdatingUser(false)}>
                <ChangeProfiloForm
                  setIsUpdatingUser={setIsUpdatingUser}
                  user={user}
                />
              </Modal>
            )}
          </div>
          <span
            onClick={() => setIsUpdatingUser(true)}
            className="cursor-pointer text-4xl transition-transform duration-200 hover:scale-110 hover:text-orange-400"
          >
            <FaUserEdit />
          </span>
        </div>
      </div>
    );
  }
}

export default Profilo;
