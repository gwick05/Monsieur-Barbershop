function CarelloHeader({ numItems }) {
  return (
    <div className="row-span-1 flex items-center justify-between px-2">
      <span className="text-2xl font-bold">Il tuo carello</span>
      <span className="text-xl font-bold">{numItems} Prodotti</span>
    </div>
  );
}

export default CarelloHeader;
