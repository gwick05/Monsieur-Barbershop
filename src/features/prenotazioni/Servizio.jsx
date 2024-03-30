import { usePrenotazioneContext } from '../../context/PrenotazioneContext';

function Servizio({ servizio }) {
  const { selectServizio, selectedServizio } = usePrenotazioneContext();
  const isSelected = servizio.id === selectedServizio?.id;
  return (
    <li
      className={`flex cursor-pointer flex-col items-center ${isSelected ? 'scale-110' : ''} transition-transform duration-200 hover:scale-110`}
      onClick={() => selectServizio(servizio)}
    >
      <img
        className={`h-48 w-60 rounded-lg  shadow-lg  ${isSelected ? 'ring-2 ring-orange-400' : ''}  `}
        src={servizio.foto}
        alt="sede"
      />
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="font-semibold capitalize">{servizio.nome}</span>
          <span>€{servizio.prezzo}</span>
        </div>
        <span>
          <b>Durata:</b> {servizio.durata} minuti
        </span>
      </div>
    </li>
  );
}

export default Servizio;
