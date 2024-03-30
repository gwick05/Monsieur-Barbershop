import { useEffect } from 'react';
import { useRef } from 'react';

function Modal({ children, close }) {
  useEffect(() => {
    const overlayEl = overlay.current;
    const windowEl = window.current;
    function handleClick(e) {
      if (!windowEl.contains(e.target)) close();
    }
    overlayEl.addEventListener('click', handleClick);
    return () => overlayEl.removeEventListener('click', handleClick);
  }, [close]);
  const overlay = useRef();
  const window = useRef();
  return (
    <div
      ref={overlay}
      className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center backdrop-blur"
    >
      <div
        ref={window}
        className="flex min-w-96 max-w-xl  flex-col items-center justify-center rounded-lg border-2   border-neutral-500 border-opacity-10 bg-neutral-300 px-3 py-4 dark:border-opacity-20 dark:bg-neutral-700"
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
