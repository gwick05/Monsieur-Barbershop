import ItemCarrello from './ItemCarrello';
import TitoloTabellaCarrello from './TitoloTabellaCarrello';

function TableBody({ cart }) {
  return (
    <div className="row-span-1 grid grid-rows-[12%_88%] px-4 ">
      <TitoloTabellaCarrello />
      <div className="grid grid-cols-5 place-content-start gap-y-2 overflow-auto ">
        {cart.map((item) => (
          <ItemCarrello item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default TableBody;
