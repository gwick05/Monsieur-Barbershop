import { createContext, useContext, useEffect, useReducer } from 'react';
import { useUser } from '../features/authentication/useUser';
import { getCart, setCart } from '../services/apiCart';

const CarrelloContext = createContext();
const initialState = { shipment: 0 };
function reducer(state, action) {
  switch (action.type) {
    //Loads the cart using the data stored in local storage
    case 'cart/loadCart':
      return { ...state, cart: action.payload };
    //This recieves an item object as payload
    case 'cart/addItem':
      return {
        ...state,
        cart: [
          ...state.cart,
          {
            ...action.payload,
            quantity: 1,
            total: action.payload.discount
              ? action.payload.price - action.payload.discount
              : action.payload.price,
          },
        ],
      };

    //This recieves an ID as payload
    case 'cart/deleteItem':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    //This recieves an ID as payload
    case 'cart/decreaseItemQuantity':
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload)
            return {
              ...item,
              quantity: item.quantity - 1,
              total: item.discount
                ? item.total - (item.price - item.discount)
                : item.total - item.price,
            };
          else return item;
        }),
      };

    //This recieves an ID as payload
    case 'cart/increaseItemQuantity':
      return {
        ...state,
        cart: state.cart.map((item) => {
          if (item.id === action.payload)
            return {
              ...item,
              quantity: item.quantity + 1,
              total: item.discount
                ? item.total + (item.price - item.discount)
                : item.total + item.price,
            };
          else return item;
        }),
      };
    case 'cart/reset':
      return initialState;

    case 'cart/selectShipment':
      return { ...state, shipment: action.payload };

    default:
      throw new Error('Azione non riconosciuta');
  }
}
function CarrelloContextProvider({ children }) {
  const [{ cart, shipment }, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated, isLoading } = useUser();

  //When the app mounts it checks if there's a current user session authenticated in that case it fetches the cart array from Supabase, else it fetches it from the local storage and if the local storage cart doesn't exist, it sets the cart to an empty array.
  useEffect(() => {
    async function fetchCart() {
      try {
        if (isAuthenticated) {
          const [data] = await getCart(user.id);
          dispatch({
            type: 'cart/loadCart',
            payload: data.cart,
          });
        } else if (!isAuthenticated && !isLoading) {
          const storedCart = localStorage.getItem('cart');
          if (storedCart) {
            dispatch({
              type: 'cart/loadCart',
              payload: JSON.parse(storedCart),
            });
          } else {
            dispatch({
              type: 'cart/loadCart',
              payload: [],
            });
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    }
    fetchCart();
  }, [user, isAuthenticated, isLoading]);

  // Updates the cart. Again, if there's a current logged in user it updates the cart related to the current user in Supabase, otherwise it updates the localStorage cart
  useEffect(() => {
    if (user) {
      setCart(cart, user.id);
    } else {
      if (cart) localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, user]);

  function addItem(item) {
    if (cart.some((cartItem) => cartItem.id === item.id))
      dispatch({ type: 'cart/increaseItemQuantity', payload: item.id });
    else dispatch({ type: 'cart/addItem', payload: item });
  }

  function selectShipment(shipment) {
    dispatch({ type: 'cart/selectShipment', payload: shipment });
  }
  function deleteItem(id) {
    dispatch({ type: 'cart/deleteItem', payload: id });
  }

  function increaseItemQuantity(id) {
    dispatch({ type: 'cart/increaseItemQuantity', payload: id });
  }

  function decreseItemQuantity(id) {
    if (cart[cart.findIndex((item) => item.id === id)].quantity - 1 === 0)
      dispatch({ type: 'cart/deleteItem', payload: id });
    else dispatch({ type: 'cart/decreaseItemQuantity', payload: id });
  }
  //Resets cart
  function resetState() {
    dispatch({ type: 'cart/reset' });
  }
  return (
    <CarrelloContext.Provider
      value={{
        cart,
        addItem,
        deleteItem,
        increaseItemQuantity,
        decreseItemQuantity,
        resetState,
        shipment,
        selectShipment,
      }}
    >
      {children}
    </CarrelloContext.Provider>
  );
}

function useCarrelloContext() {
  const context = useContext(CarrelloContext);
  if (context === undefined)
    throw new Error('Il context si trova al di fuori del provider');
  return context;
}

export { CarrelloContextProvider, useCarrelloContext };
