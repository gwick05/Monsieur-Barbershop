import { useCarrelloContext } from '../context/CarrelloContext';
import TabellaCarrello from '../features/carrello/TabellaCarrello';
import RiepilogoOrdine from '../features/carrello/RiepilogoOrdine';

function Carrello() {
  const { cart = [], shipment } = useCarrelloContext();
  const itemsTotal = cart.reduce((acc, item) => acc + item.total, 0);
  console.log(itemsTotal);
  console.log(shipment);
  const cartTotal = itemsTotal + shipment;

  return (
    <div className="grid h-full w-full grid-cols-[75%_25%] gap-x-2 px-6 py-6">
      <TabellaCarrello cart={cart} />
      <RiepilogoOrdine
        cart={cart}
        itemsTotal={itemsTotal}
        cartTotal={cartTotal}
      />
    </div>
  );
}

export default Carrello;
