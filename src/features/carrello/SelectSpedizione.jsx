import { useSpedizioni } from './useSpedizioni';
import Spinner from '../../ui/Spinner';
import MiniErrore from '../../ui/MiniErrore';
import { useCarrelloContext } from '../../context/CarrelloContext';

function SelectSpedizione() {
  const { selectShipment } = useCarrelloContext();
  const { spedizioni = [], error, isLoading } = useSpedizioni();

  if (isLoading) {
    return <Spinner />;
  } else if (error || spedizioni.length === 0) {
    return (
      <MiniErrore error={"Impossibile caricare le modalita' di spedizione"} />
    );
  } else {
    return (
      <select
        className="rounded-lg px-2 py-1 text-neutral-700 "
        defaultValue={'default'}
        onChange={(e) => {
          selectShipment(Number(e.target.value));
        }}
      >
        <option disabled value={'default'}>
          Seleziona il tipo di spedizione
        </option>
        {spedizioni.map((spedizione) => (
          <option
            value={spedizione.prezzo}
            key={spedizione.id}
          >{`${spedizione.tipo} (${spedizione.durata} giorni, prezzo €${spedizione.prezzo})`}</option>
        ))}
      </select>
    );
  }
}

export default SelectSpedizione;
