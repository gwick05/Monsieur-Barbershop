import { useEffect } from 'react';
import { useServizi } from './useServizi';
import { usePrenotazioneContext } from '../../context/PrenotazioneContext';
import Spinner from '../../ui/Spinner';
import Servizio from './Servizio';
import ListaPrenotazione from './ListaPrenotazione';

function SelezionaServizio() {
  const { catchError } = usePrenotazioneContext();
  const { servizi, isLoading, error } = useServizi();

  useEffect(() => {
    if (error) {
      console.log('happening');
      catchError();
    }
  }, [error, catchError]);

  if (isLoading) {
    return <Spinner />;
  } else if (error) {
    return null;
  } else {
    return (
      <ListaPrenotazione label="Seleziona il servizio">
        {servizi.map((servizio) => (
          <Servizio servizio={servizio} key={servizio.id} />
        ))}
      </ListaPrenotazione>
    );
  }
}

export default SelezionaServizio;
