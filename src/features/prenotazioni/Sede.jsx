import { usePrenotazioneContext } from '../../context/PrenotazioneContext';

function Sede({ sede }) {
  const { selectedSede, selectSede } = usePrenotazioneContext();
  const isSelected = sede.id === selectedSede?.id;

  return (
    <li
      className={`flex cursor-pointer flex-col items-center ${isSelected ? 'scale-110' : ''} transition-transform duration-200 hover:scale-110`}
      onClick={() => selectSede(sede)}
    >
      <img
        className={`h-48 rounded-lg  shadow-lg  ${isSelected ? 'ring-2 ring-orange-400' : ''}  `}
        src={sede.foto}
        alt="sede"
      />
      <span className="font-semibold capitalize">
        {sede.nome}, {sede.via}
      </span>
    </li>
  );
}

export default Sede;
