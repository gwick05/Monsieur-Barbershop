import Button from '../../ui/Button';
import MiniSpinner from '../../ui/MiniSpinner';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function Prenotazione({
  isDeleting,
  onDelete,
  attuale = true,
  barbiere,
  orarioFine,
  orarioInizio,
  servizio,
  data,
  sede,
}) {
  return (
    <div className="flex">
      <div className="flex items-center gap-20">
        <div className=" flex w-80 flex-col items-center">
          <LazyLoadImage
            className="h-96 rounded-md border-2 border-neutral-500 border-opacity-20   shadow-md"
            src={barbiere.image}
            alt="barber"
          />
          <span className="text-lg font-semibold capitalize">
            {barbiere.nome} {barbiere.cognome}
          </span>
        </div>
        <div className="flex flex-col gap-12 text-lg font-normal">
          <span>
            <b>Data appuntamento: </b> {data}
          </span>
          <span>
            <b>Sede appuntamento: </b>
            {sede.nome}, {sede.via}
          </span>
          <div className="flex gap-4">
            <span>
              <b>Inizio: </b> {orarioInizio.slice(0, -3)}
            </span>
            <span>
              <b>Fine: </b> {orarioFine.slice(0, -3)}
            </span>
          </div>
          <span>
            <b>Servizio: </b> {servizio.nome}
          </span>

          {attuale && (
            <div className="flex gap-4 ">
              <Button disabled={isDeleting} onClick={onDelete} type="primary">
                {isDeleting ? <MiniSpinner /> : 'Disdici'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Prenotazione;
