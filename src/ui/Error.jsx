import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import Button from '../ui/Button';

function Error({ error }) {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  return (
    isOpen && (
      <div className="dark:border-opacity-500  h-2/3 w-2/3 rounded-lg border-2 border-neutral-700 border-opacity-30 shadow-lg ">
        <div className="flex h-2/3 w-full flex-col items-center justify-between rounded-t   bg-red-500 px-2 py-4">
          <span
            onClick={() => setIsOpen(false)}
            className="self-end text-3xl font-extrabold text-white hover:cursor-pointer "
          >
            {<IoMdClose />}
          </span>
          <div className="flex w-full flex-col items-center justify-between overflow-auto">
            <span className="text-7xl font-extrabold">ERRORE!</span>
            <span className="w-full text-wrap text-center text-xl font-semibold">
              {error}
            </span>
          </div>
          <div></div>
        </div>
        <div className="flex h-1/3 w-full items-center justify-end gap-4 rounded-b  bg-neutral-300 px-2">
          <Button type="primary" onClick={() => navigate(-1)}>
            Indietro
          </Button>
          <Button type="secondary" onClick={() => setIsOpen(false)}>
            OK!
          </Button>
        </div>
      </div>
    )
  );
}

export default Error;
