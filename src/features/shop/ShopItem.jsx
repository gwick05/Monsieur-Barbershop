import { useState } from 'react';
import { MdArrowBackIos } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { IoCartOutline } from 'react-icons/io5';
import { useCarrelloContext } from '../../context/CarrelloContext';
import Button from '../../ui/Button';
import IncreaseDecreaseItemComponent from '../../ui/IncreaseDecreaseItemComponent';

function ShopItem({ item }) {
  const { photos, description, name, id } = item;
  const [currPhoto, setCurrPhoto] = useState(0);
  const [isBeingFocused, setIsBeingFocused] = useState(false);
  const [isExtended, setIsExtended] = useState(false);
  const {
    addItem,
    cart = [],
    decreseItemQuantity,
    increaseItemQuantity,
  } = useCarrelloContext();
  const isPresentInCart = cart.find((item) => item.id === id);

  return (
    <li
      className="h-auto w-60 transform  transition-transform duration-200 hover:scale-105 hover:cursor-pointer "
      onMouseEnter={() => setIsBeingFocused(true)}
      onMouseLeave={() => {
        setIsBeingFocused(false);
        setCurrPhoto(0);
        setIsExtended(false);
      }}
    >
      <div className="flex w-full flex-col gap-4 rounded-lg border-2 border-neutral-500  border-opacity-10 bg-neutral-300 px-3 py-4 dark:border-opacity-20   dark:bg-neutral-700">
        <div className="relative h-60 w-full text-neutral-700">
          <div className="h-full w-full">
            <img
              src={photos[currPhoto]}
              alt="product-photo"
              className="h-full w-full"
            />

            {isBeingFocused && (
              <>
                {currPhoto > 0 && (
                  <button
                    onClick={() =>
                      setCurrPhoto((currPhoto) => {
                        if (currPhoto > 0) return currPhoto - 1;
                        else return currPhoto;
                      })
                    }
                    className="absolute left-0.5 top-2/4 -translate-y-1/2  transform opacity-35 transition-transform hover:scale-125 hover:opacity-100"
                  >
                    <span>
                      <MdArrowBackIos />
                    </span>
                  </button>
                )}
                {currPhoto < photos.length - 1 && (
                  <button
                    onClick={() =>
                      setCurrPhoto((currPhoto) => {
                        if (currPhoto < photos.length - 1) return currPhoto + 1;
                        else return currPhoto;
                      })
                    }
                    className="absolute right-0.5 top-2/4 -translate-y-1/2 transform  opacity-35 transition-transform hover:scale-125 hover:opacity-100"
                  >
                    <span className=" ">
                      <MdArrowForwardIos />
                    </span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold ">{name}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xl">
              {item.discount ? (
                <>
                  <span className="text-lg line-through decoration-red-500">
                    €{item.price}
                  </span>
                  <span>€{item.price - item.discount}</span>
                </>
              ) : (
                <span>€{item.price}</span>
              )}
            </div>
            {isPresentInCart ? (
              <IncreaseDecreaseItemComponent
                onIncrease={() => increaseItemQuantity(id)}
                onDecrease={() => decreseItemQuantity(id)}
                quantity={isPresentInCart?.quantity}
              />
            ) : (
              <Button onClick={() => addItem(item)} type="primary">
                <span className="text-3xl ">{<IoCartOutline />} </span>
              </Button>
            )}
          </div>
        </div>
      </div>
      <button
        className="flex items-center gap-3 "
        onClick={() => setIsExtended((state) => !state)}
      >
        <span className="transition-transform hover:scale-150 hover:cursor-pointer">
          {isExtended ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
        <span> Scopri di piu sul prodotto</span>
      </button>

      {isExtended && (
        <div className="w-full text-pretty  break-words rounded-lg border-2 border-neutral-500 border-opacity-10  px-4 py-2 shadow-lg">
          {description}
        </div>
      )}
    </li>
  );
}

export default ShopItem;
