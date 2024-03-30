import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useNavigate, useParams } from 'react-router-dom';

function ChangeView({ center, zoom, sedePiuVicina }) {
  const navigate = useNavigate();
  const { id: sedeSelected } = useParams();
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, zoom);
    if (!sedeSelected && sedePiuVicina) navigate(`/contatti/${sedePiuVicina}`);
  }, [map, center, zoom, sedePiuVicina, sedeSelected, navigate]);

  return null;
}

export default ChangeView;
