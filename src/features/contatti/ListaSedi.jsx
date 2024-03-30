import Sede from './Sede';

function ListaSedi({ sedePiuVicina, sedi }) {
  return (
    <ul className="col-start-1 col-end-3 row-start-4 row-end-12 flex flex-col  gap-2">
      <span className="text-lg font-bold">Le nostre sedi</span>
      {sedi.map((sede) => (
        <Sede key={sede.id} sede={sede} sedePiuVicina={sedePiuVicina} />
      ))}
    </ul>
  );
}

export default ListaSedi;
