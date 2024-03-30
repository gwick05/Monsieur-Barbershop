import { LazyLoadImage } from 'react-lazy-load-image-component';
import { usePrenotazioneContext } from '../../context/PrenotazioneContext';

function Barber({ barber }) {
  const { selectedBarber, selectBarber } = usePrenotazioneContext();
  const isSelected = selectedBarber === barber.id;
  return (
    <li
      className={`flex cursor-pointer flex-col items-center ${isSelected ? 'scale-110' : ''} transition-transform duration-200 hover:scale-110`}
      onClick={() => selectBarber(barber.id)}
    >
      <LazyLoadImage
        src={barber.image}
        alt="barber"
        className={`h-60 w-40 rounded-lg  shadow-lg  ${isSelected ? 'ring-2 ring-orange-400' : ''}  `}
      />
      <span>
        {barber.nome} {barber.cognome}
      </span>
    </li>
  );
}

export default Barber;
