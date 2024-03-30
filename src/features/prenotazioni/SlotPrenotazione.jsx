function SlotPrenotazione({ slot, onSelectSlot, selectedSlot }) {
  return (
    <li
      onClick={() => onSelectSlot(slot)}
      className={`${selectedSlot?.inizio === slot ? ' bg-orange-400 font-bold ring-2 ring-neutral-700 dark:ring-neutral-50' : 'bg-neutral-300 dark:bg-neutral-700'} hover rounded-lg px-4 py-2 shadow-lg transition-transform duration-100 hover:scale-105 hover:cursor-pointer hover:bg-orange-400 hover:font-bold hover:ring-2 hover:ring-neutral-700 hover:dark:ring-neutral-50`}
    >
      {slot}
    </li>
  );
}

export default SlotPrenotazione;
