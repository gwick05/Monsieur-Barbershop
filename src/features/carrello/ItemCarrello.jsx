import { useCarrelloContext } from '../../context/CarrelloContext';
import Button from '../../ui/Button';
import IncreaseDecreaseItemComponent from '../../ui/IncreaseDecreaseItemComponent';
function ItemCarrello({ item }) {
  const { deleteItem, increaseItemQuantity, decreseItemQuantity } =
    useCarrelloContext();
  return (
    <>
      <div className="flex flex-col items-center justify-center  border-b border-neutral-200 border-opacity-50  px-2 px-2 py-2 dark:border-neutral-600">
        <img
          src={item.photos[0]}
          alt="immagine-prodotto"
          className="h-32 w-28 rounded-lg"
        />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-evenly border-b border-neutral-200 border-opacity-50 px-2 dark:border-neutral-600">
        <span className=" font-semibold">{item.name}</span>
        <Button type="secondary" onClick={() => deleteItem(item.id)}>
          Elimina
        </Button>
      </div>
      <IncreaseDecreaseItemComponent
        onIncrease={() => increaseItemQuantity(item.id)}
        onDecrease={() => decreseItemQuantity(item.id)}
        quantity={item.quantity}
        shop={false}
        additionalCss="border-b  border-neutral-200 border-opacity-50 px-2 dark:border-neutral-600"
      />

      <span className="flex h-full w-full flex-col items-center justify-center border-b border-neutral-200  border-opacity-50  px-2 dark:border-neutral-600">
        €{item.discount ? item.price - item.discount : item.price}
      </span>
      <span className="flex h-full w-full flex-col items-center justify-center border-b border-neutral-200  border-opacity-50  px-2 dark:border-neutral-600">
        €
        {item.discount
          ? (item.price - item.discount) * item.quantity
          : item.price * item.quantity}
      </span>
    </>
  );
}

export default ItemCarrello;
