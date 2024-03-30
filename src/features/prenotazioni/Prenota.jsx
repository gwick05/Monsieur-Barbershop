import { useEffect } from 'react';
import { usePrenotazioneAttuale } from './usePrenotazioneAttuale';
import { usePrenotazioneContext } from '../../context/PrenotazioneContext';
import DatepickerComponent from './DatepickerComponent';
import SelezionaServizio from './SelezionaServizio';
import ListaSlotPrenotazione from './ListaSlotPrenotazione';
import SelezionaSede from './SelezionaSede';
import SelezionaBarbiere from './SelezionaBarbiere';
import Spinner from '../../ui/Spinner';
import Error from '../../ui/Error';

function Prenota() {
  const {
    selectedBarber,
    selectedServizio,
    selectedSede,
    resetState,
    date,
    errorPrenotazione: error,
  } = usePrenotazioneContext();
  const prenotazioneAttuale = usePrenotazioneAttuale();

  //Reset PrenotazioniContext state when the component mounts
  useEffect(() => {
    return () => {
      resetState();
    };
  }, [resetState]);

  if (prenotazioneAttuale.isLoading) {
    return (
      <div className="flex h-[400px] w-full flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  } else if (error) {
    return <Error error={error} />;
  } else if (prenotazioneAttuale?.id_prenotazione) {
    return <h1 className="text-2xl">Hai gia una prenotazione 😄</h1>;
  } else {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-10 ">
        <SelezionaSede />
        {selectedSede && <SelezionaBarbiere />}
        {selectedBarber && <SelezionaServizio />}
        {selectedServizio && <DatepickerComponent />}
        {date && <ListaSlotPrenotazione />}
      </div>
    );
  }
}

export default Prenota;
