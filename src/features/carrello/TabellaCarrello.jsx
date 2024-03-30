import CarelloHeader from './CarelloHeader';
import TabellaCarrelloFooter from './TabellaCarrelloFooter';
import TableBody from './TableBody';

function TabellaCarrello({ cart }) {
  return cart.length > 0 ? (
    <div className="col-span-1 grid grid-rows-[auto_490px_auto] rounded-lg border-2  border-neutral-500 border-opacity-10 bg-neutral-300 shadow-lg  dark:border-opacity-20 dark:bg-neutral-700">
      <CarelloHeader numItems={cart.length} />
      <TableBody cart={cart} />
      <TabellaCarrelloFooter />
    </div>
  ) : (
    <div className="col-span-1 grid grid-rows-[auto_490px_auto] place-content-center items-center  justify-items-center rounded-lg border-2 border-neutral-500  border-opacity-10 bg-neutral-300 shadow-lg dark:border-opacity-20 dark:bg-neutral-700">
      <span className="row-span-full text-3xl font-bold">Carello vuoto!</span>
    </div>
  );
}

export default TabellaCarrello;
