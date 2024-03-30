import { useContatti } from './useContatti';
import { objectToArray } from '../../utils/helpers/returnObjToArray';
import MiniErrore from '../../ui/MiniErrore';
import Spinner from '../../ui/Spinner';

function ListaContatti() {
  const { contatti, isLoading: contattiLoading, error } = useContatti();
  const [{ created_at = '', id = '', ...infoContatti }] = contatti || [
    { created_at: '', id: '' },
  ];
  const infoContattiArray = infoContatti ? objectToArray(infoContatti) : [];

  if (contattiLoading) {
    return <Spinner />;
  } else if (error) {
    return <MiniErrore error={error.message} />;
  } else {
    return (
      <ul className="col-start-1 col-end-3 row-start-2 row-end-4 flex flex-col gap-2">
        <span className="text-lg font-bold">Puoi contattarci attraverso:</span>
        <div className="text-pretty break-words px-2">
          {infoContattiArray?.map((contattoObj) =>
            Object.entries(contattoObj).map(([key, value]) => (
              <li key={key}>
                <span className="font-semibold capitalize">{key}: </span>
                <span> {value}</span>
              </li>
            )),
          )}
        </div>
      </ul>
    );
  }
}

export default ListaContatti;
