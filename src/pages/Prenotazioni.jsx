import { Outlet } from 'react-router-dom';

function Prenotazioni() {
  return (
    <div className="flex w-11/12 flex-col items-center py-12">
      <Outlet />
    </div>
  );
}

export default Prenotazioni;
