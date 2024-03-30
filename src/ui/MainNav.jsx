import { useUser } from '../features/authentication/useUser';
import { HiHome } from 'react-icons/hi2';
import { HiCalendar } from 'react-icons/hi2';
import { HiMiniShoppingBag } from 'react-icons/hi2';
import { FaBloggerB } from 'react-icons/fa';
import { MdContactSupport } from 'react-icons/md';
import MainNavItem from './MainNavItem';
import NestedMainNavItem from './NestedMainNavItem';

function MainNav() {
  const { isAuthenticated } = useUser();

  return (
    <ul className="flex h-full list-none flex-col items-center gap-10">
      <MainNavItem label="Home" icon={<HiHome />} to="home" />
      {isAuthenticated && (
        <MainNavItem
          label="Prenotazioni"
          icon={<HiCalendar />}
          to="/prenotazioni"
        >
          <NestedMainNavItem label="Attuale" to="/prenotazioni/attuale" />
          <NestedMainNavItem label="Passate" to="/prenotazioni/passate" />
          <NestedMainNavItem label="Prenota" to="/prenotazioni/prenota" />
          <NestedMainNavItem
            label="Statistiche"
            to="/prenotazioni/statistiche"
          />
        </MainNavItem>
      )}
      <MainNavItem label="Shop" icon={<HiMiniShoppingBag />} to="shop" />
      <MainNavItem label="Blog" icon={<FaBloggerB />} to="blog" />
      <MainNavItem label="Contatti" icon={<MdContactSupport />} to="contatti" />
    </ul>
  );
}

export default MainNav;
