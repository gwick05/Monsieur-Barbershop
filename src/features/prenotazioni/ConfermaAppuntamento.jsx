import { usePrenotazioneContext } from '../../context/PrenotazioneContext';
import Button from '../../ui/Button';
import MiniSpinner from '../../ui/MiniSpinner';

function ConfermaAppuntamento() {
  const { selectedServizio, selectedSlot, date, bookAppointment, isBooking } =
    usePrenotazioneContext();
  console.log(isBooking);
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-lg font-semibold">
        <span className="capitalize"> {selectedServizio.nome}</span> il{' '}
        {date.startDate} alle ore {selectedSlot.inizio}
      </span>
      <Button type="primary" onClick={bookAppointment} disabled={isBooking}>
        {isBooking ? <MiniSpinner /> : 'Conferma'}
      </Button>
    </div>
  );
}

export default ConfermaAppuntamento;
