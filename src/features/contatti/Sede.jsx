import { Link, useParams } from 'react-router-dom';
import { useCheckDateAndTimeAvailability } from '../../hooks/useCheckDateAndTimeAvailability';

function Sede({ sedePiuVicina, sede }) {
  const { id: sedeSelected } = useParams();
  const { isInTimeRange } = useCheckDateAndTimeAvailability(sede);

  return (
    <li className="col-start-1 col-end-3 row-span-1 rounded-lg border-2 border-neutral-500 border-opacity-10 bg-neutral-300 px-1   py-1 dark:bg-neutral-700">
      <Link
        to={`/contatti/${sede.id}?lat=${sede.location.lat}&lng=${sede.location.lng}`}
        className={`flex items-center justify-between rounded-lg px-1 hover:cursor-pointer hover:bg-neutral-200  dark:hover:bg-neutral-600 ${sedeSelected ? (+sedeSelected === sede.id ? ' bg-neutral-200 dark:bg-neutral-600' : '') : sedePiuVicina.fakeId === sede.id ? 'bg-neutral-200 dark:bg-neutral-600' : ''}`}
      >
        <div className="flex flex-col">
          <span className="font-semibold capitalize"> {sede.nome}</span>
          <span className="capitalize"> {sede.via}</span>
        </div>
        <div className="flex gap-2">
          {sedePiuVicina?.id === sede.id && (
            <span className="rounded-lg bg-orange-400 px-1 font-semibold ">
              Sede piu vicina
            </span>
          )}
          {
            <span
              className={`h-fit rounded-lg font-semibold ${
                isInTimeRange ? 'bg-green-400' : 'bg-red-400'
              } px-2`}
            >
              {isInTimeRange ? 'Aperto' : 'Chiuso'}
            </span>
          }
        </div>
      </Link>
    </li>
  );
}

export default Sede;
