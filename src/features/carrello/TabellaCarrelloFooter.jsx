import { IoIosArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom';

function TabellaCarrelloFooter() {
  return (
    <footer className="flex flex-col justify-center px-2">
      <Link to="/shop" className="flex items-center gap-2">
        <span className="text-3xl">
          <IoIosArrowRoundBack />
        </span>
        <span className="text-lg">Continua la spesa</span>
      </Link>
    </footer>
  );
}

export default TabellaCarrelloFooter;
