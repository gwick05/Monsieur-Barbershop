import { usePrenotazioneAttuale } from './usePrenotazioneAttuale';
import { useDeletePrenotazioneAttuale } from './useDeletePrenotazioneAttuale';
import Prenotazione from './Prenotazione';
import Spinner from '../../ui/Spinner';
import Error from '../../ui/Error';
import Button from '../../ui/Button';
import { Link } from 'react-router-dom';

function PrenotazioneAttuale() {
  const { isPending: isDeleting, deletePrenotazioneAttuale } =
    useDeletePrenotazioneAttuale();
  const prenotazioneAttuale = usePrenotazioneAttuale();
  const {
    error,
    isLoading,
    id_prenotazione,
    id_user,
    noAppointment,
    pren: prenotazione,
  } = prenotazioneAttuale;

  const handleDisdici = function (e) {
    e.preventDefault();
    deletePrenotazioneAttuale({
      userId: id_user,
      prenotazioneId: id_prenotazione,
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] w-full flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  } else if (error) {
    return (
      <div className="flex h-[500px]  w-[1100px] flex-col items-center justify-center">
        <Error error={'Impossibile caricare la prenotazione attuale!'} />
      </div>
    );
  } else if (noAppointment) {
    return (
      <div className="flex h-full w-full flex-col items-center gap-2 py-4">
        <h1 className="text-2xl">Non hai una prenotazione 😓</h1>
        <Link to="/prenotazioni/prenota">
          <Button type="primary">Prenota ora!</Button>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="flex  w-full flex-col items-center">
        <div>
          <Prenotazione
            isDeleting={isDeleting}
            onDelete={handleDisdici}
            {...prenotazione}
          />
        </div>
      </div>
    );
  }
}

export default PrenotazioneAttuale;
