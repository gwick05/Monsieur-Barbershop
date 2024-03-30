import { useOrariDisponibili } from './useOrariDisponibili';
import { usePrenotazioneContext } from '../../context/PrenotazioneContext';
import computeAvailableSlotsForDate from '../../utils/helpers/computeAvailableSlotsForDate';
import SlotPrenotazione from './SlotPrenotazione';
import Spinner from '../../ui/Spinner';
import ConfermaAppuntamento from './ConfermaAppuntamento';
import ListaPrenotazione from './ListaPrenotazione';

function ListaSlotPrenotazione() {
  const {
    selectedServizio,
    selectedSlot,
    selectSlot,
    selectedBarber,
    date,
    selectedSede,
  } = usePrenotazioneContext();

  const {
    oreLavoro: { mattina, pomeriggio },
  } = selectedSede;

  const {
    alreadyTakenSlots,
    error: errorAlreadyTakenSlots,
    isLoading: loadingAlreadyTakenSlots,
  } = useOrariDisponibili(selectedBarber, date.startDate);

  if (loadingAlreadyTakenSlots) {
    return <Spinner />;
  } else if (errorAlreadyTakenSlots) {
    return null;
  } else {
    const listOfStillAvailableSlots = computeAvailableSlotsForDate(
      alreadyTakenSlots,
      mattina,
      pomeriggio,
      selectedServizio.durata,
      date,
    );

    return (
      <>
        <ListaPrenotazione label="Orari disponibili">
          {listOfStillAvailableSlots.map((slot) => (
            <SlotPrenotazione
              slot={slot}
              key={slot}
              onSelectSlot={selectSlot}
              selectedSlot={selectedSlot}
            />
          ))}
        </ListaPrenotazione>

        {selectedSlot && <ConfermaAppuntamento />}
      </>
    );
  }
}

export default ListaSlotPrenotazione;
