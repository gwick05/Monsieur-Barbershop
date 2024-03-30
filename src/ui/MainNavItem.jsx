import { useState } from 'react';
import { NavLink } from 'react-router-dom';
function MainNavItem({ icon, label, to, children }) {
  const [isExtended, setIsExtended] = useState(false);
  return (
    <li
      className="w-full"
      onMouseEnter={() => setIsExtended(true)}
      onMouseLeave={() => setIsExtended(false)}
    >
      <NavLink
        to={to}
        className=" flex w-full flex-wrap items-center  gap-3 px-3 py-2 text-center hover:text-orange-500  "
      >
        <span className="text-3xl uppercase ">{icon} </span>
        <span className="text-lg capitalize ">{label} </span>
      </NavLink>
      <ul
        className={`flex flex-col gap-2 transition-all duration-300 ${
          isExtended ? 'max-h-96' : 'max-h-0 overflow-hidden'
        }`}
      >
        {children}
      </ul>
    </li>
  );
}

export default MainNavItem;
