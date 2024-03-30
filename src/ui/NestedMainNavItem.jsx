import { NavLink } from 'react-router-dom';

function NestedMainNavItem({ label, to }) {
  return (
    <li className="w-full">
      <NavLink
        to={to}
        className=" flex w-full flex-wrap  items-center gap-3  px-6 py-2 text-center  hover:text-orange-500"
      >
        <span className="text-md capitalize ">{label} </span>
      </NavLink>
    </li>
  );
}

export default NestedMainNavItem;
