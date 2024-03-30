import { useEffect } from 'react';
import { useSedi } from '../../hooks/useSedi';
import { usePrenotazioneContext } from '../../context/PrenotazioneContext';
import Spinner from '../../ui/Spinner';
import Sede from './Sede';
import ListaPrenotazione from './ListaPrenotazione';

function SelezionaSede() {
  const { selectSede, catchError, selectedSede } = usePrenotazioneContext();
  const { sedi, isLoading, error } = useSedi();

  useEffect(() => {
    if (error) {
      catchError();
    }
  }, [catchError, error]);

  if (isLoading) {
    return <Spinner />;
  } else if (error) {
    return null;
  } else {
    return (
      <ListaPrenotazione label="Seleziona una sede">
        {sedi.map((sede) => (
          <Sede
            sede={sede}
            key={sede.id}
            onSelect={selectSede}
            selectedSede={selectedSede}
          />
        ))}
      </ListaPrenotazione>
    );
  }
}

export default SelezionaSede;
