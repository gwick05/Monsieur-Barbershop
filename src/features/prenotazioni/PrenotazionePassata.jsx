import { LuFolderDown } from 'react-icons/lu';
import { LuFolderUp } from 'react-icons/lu';
import Prenotazione from './Prenotazione';

function PrenotazionePassata({ prenotazione, onOpen, currOpen, index }) {
  return (
    <li>
      <div>
        <div className=" border-b border-neutral-500 border-opacity-20">
          <div
            onClick={() => onOpen(index)}
            className="flex items-center gap-4 font-semibold hover:cursor-pointer hover:text-orange-400"
          >
            <span className="text-3xl">
              {currOpen === index ? <LuFolderUp /> : <LuFolderDown />}
            </span>
            <h3>{prenotazione.data}</h3>
          </div>
        </div>
        {currOpen === index && (
          <div className="py-2">
            <Prenotazione attuale={false} {...prenotazione} />
          </div>
        )}
      </div>
    </li>
  );
}

export default PrenotazionePassata;
