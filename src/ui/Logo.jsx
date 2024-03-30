import { Link } from 'react-router-dom';

import LogoLight from '../media/logoLight.png';

function Logo() {
  return (
    <Link to="/" className=" flex justify-center py-6">
      <img src={LogoLight} alt="Logo" className="h-28" />
    </Link>
  );
}

export default Logo;
