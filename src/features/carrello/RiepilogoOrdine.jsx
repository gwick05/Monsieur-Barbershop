import toast from 'react-hot-toast';
import SelectSpedizione from './SelectSpedizione';
import Button from '../../ui/Button';

function RiepilogoOrdine({ cart, itemsTotal, cartTotal }) {
  return (
    <div className=" rounded-lg border-2  border-neutral-500 border-opacity-10  bg-neutral-300 shadow-lg dark:border-opacity-20  dark:bg-neutral-700">
      <div className=" flex flex-wrap justify-between px-4 py-2">
        <h1 className="break-words text-xl font-semibold ">Riepilogo ordine</h1>
      </div>
      <div className=" flex justify-between px-4 py-2">
        <h1 className="text-sm font-semibold ">
          {cart.reduce((acc, item) => acc + item.quantity, 0)} PRODOTTI
        </h1>
        <h2 className="text-sm font-semibold ">€{itemsTotal}</h2>
      </div>
      <div className="flex flex-col justify-between space-y-4  px-4 py-4">
        <h1 className="break-words text-sm font-semibold     ">SPEDIZIONE</h1>
        <SelectSpedizione />
        <div className=" flex flex-col justify-between space-y-2">
          <h1 className="text-sm font-semibold ">CODICE PROMO</h1>
          <input
            className="rounded-md px-2 py-1"
            placeholder="INSERISCI CODICE"
          ></input>
        </div>
        <Button type="secondary">APPLICA</Button>
      </div>
      <div className=" flex flex-col  gap-2  px-2 py-4">
        <div className="flex  justify-between">
          <h1 className="text-sm font-semibold ">COSTO TOTALE</h1>
          <h2 className="text-sm font-semibold ">€{cartTotal}</h2>
        </div>
        <Button
          onClick={() =>
            toast.error(
              'Pagina non disponibile prima del prodotto di produzione',
            )
          }
          type="primaryFull"
        >
          CHECKOUT
        </Button>
      </div>
    </div>
  );
}

export default RiepilogoOrdine;
