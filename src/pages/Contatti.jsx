import { Link } from 'react-router-dom';
import { useUserLocation } from '../hooks/useUserLocation';
import { useSedi } from '../hooks/useSedi';
import Spinner from '../ui/Spinner';
import Map from '../features/contatti/Map';
import ListaContatti from '../features/contatti/ListaContatti';
import ListaSedi from '../features/contatti/ListaSedi';
import Error from '../ui/Error';
import Button from '../ui/Button';
import { closest } from '../utils/helpers/closest';

function Contatti() {
  const { userLocation } = useUserLocation();
  const { sedi, isLoading: sediLoading, error } = useSedi();
  const sedePiuVicina = sedi
    ? userLocation
      ? closest(userLocation, sedi)
      : { location: Object.values(sedi[0].location), fakeId: sedi[0].id }
    : { location: [0, 0] };
  if (sediLoading) {
    return <Spinner />;
  } else if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Error error={error.message} />
      </div>
    );
  } else {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className=" grid  h-5/6 w-11/12 grid-cols-6  gap-2 overflow-auto py-2">
          <div
            className="col-start-1 col-end-3 flex items-center justify-between "
            to="/prenotazioni/prenota"
          >
            <span className="text-lg font-bold  ">
              Non hai un appuntamento?
            </span>
            <Link to="/prenotazioni/prenota">
              <Button type="primary">PRENOTA ORA!</Button>
            </Link>
          </div>
          <ListaContatti />

          <ListaSedi sedePiuVicina={sedePiuVicina} sedi={sedi ? sedi : []} />

          <Map sedePiuVicina={sedePiuVicina} />
        </div>
      </div>
    );
  }
}

export default Contatti;
