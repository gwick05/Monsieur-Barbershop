import { useEffect } from 'react';
import { useBarbers } from './useBarbers';
import { usePrenotazioneContext } from '../../context/PrenotazioneContext';
import Barber from './Barber';
import Spinner from '../../ui/Spinner';
import ListaPrenotazione from './ListaPrenotazione';

function SelezionaBarbiere() {
  const { selectedSede, catchError } = usePrenotazioneContext();
  const { barbers = [], isLoading, error } = useBarbers();
  useEffect(() => {
    if (error) catchError();
  }, [error, catchError]);

  if (isLoading) {
    return <Spinner />;
  } else if (error) {
    return null;
  } else {
    return (
      <ListaPrenotazione label="Seleziona un barbiere">
        {barbers
          .filter((barber) => barber.id_sede === selectedSede.id)
          .map((barber) => (
            <Barber barber={barber} key={barber.id} />
          ))}
      </ListaPrenotazione>
    );
  }
}

export default SelezionaBarbiere;
