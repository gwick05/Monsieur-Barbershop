import { NavLink } from 'react-router-dom';
import { useCarrelloContext } from '../context/CarrelloContext';
import { IoCartOutline } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { MdLightMode } from 'react-icons/md';
import { MdDarkMode } from 'react-icons/md';

import WrittenLogoLight from '../media/writtenLogoLight.png';

import { useDarkModeContext } from '../context/DarkModeContext';

function Header() {
  const { cart } = useCarrelloContext();
  const { dark, toggleDark } = useDarkModeContext();
  return (
    <header className="flex h-2/8 items-center  justify-between bg-neutral-300 text-neutral-700 transition-colors duration-500 dark:bg-neutral-800 dark:text-neutral-50">
      <img src={WrittenLogoLight} alt="Logo" className="h-14 px-4" />
      <div className="flex items-center gap-16 px-10">
        <NavLink
          to="/carrello"
          className="text grid  grid-cols-5  text-3xl hover:text-orange-500"
        >
          <IoCartOutline className="col-start-2 col-end-5 row-start-2 row-end-5" />
          {cart && cart.length > 0 && (
            <span className="col-start-4 col-end-6 row-start-2 row-end-3 h-fit w-fit rounded-full bg-red-700 px-1 text-center text-xs font-semibold text-white">
              {cart && cart.length}
            </span>
          )}
        </NavLink>
        <NavLink to="/profilo" className="text-3xl hover:text-orange-500">
          <CgProfile />
        </NavLink>
        <button onClick={toggleDark}>
          <span className="text text-3xl hover:text-amber-100 dark:hover:text-amber-100">
            {!dark ? <MdDarkMode /> : <MdLightMode />}
          </span>
        </button>
      </div>
    </header>
  );
}

export default Header;
