import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSedi } from '../../hooks/useSedi';
import ChangeView from './ChangeView';
import Spinner from '../../ui/Spinner';
import Error from '../../ui/Error';

function Map({ sedePiuVicina }) {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const navigate = useNavigate();
  const { sedi = [], isLoading: sediLoading, error } = useSedi();

  if (sediLoading) {
    return <Spinner />;
  } else if (error) {
    return <Error error={'Impossibile caricare! '} />;
  } else {
    return (
      <div className="col-start-3 col-end-7 row-start-1 row-end-12">
        <MapContainer
          scrollWheelZoom={true}
          zoom={10}
          center={sedePiuVicina?.closest || sedePiuVicina.location}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ChangeView
            center={
              lat && lng
                ? [lat, lng]
                : sedePiuVicina?.closest || sedePiuVicina.location
            }
            zoom={10}
            sedePiuVicina={sedePiuVicina.id}
          />
          {sedi.map((sede) => {
            return (
              <Marker
                position={Object.values(sede.location)}
                key={sede.id}
                eventHandlers={{
                  click: () => {
                    navigate(
                      `/contatti/${sede.id}?lat=${sede.location.lat}&lng=${sede.location.lng}`,
                    );
                  },
                }}
              >
                <Popup>{sede.nome}</Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    );
  }
}

export default Map;
