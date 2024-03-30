function TitoloTabellaCarrello() {
  return (
    <div className="row-span-1 grid h-full  w-full grid-cols-5 ">
      <span className="col-start-2 col-end-3 flex h-full w-full flex-col items-center justify-center px-2 text-lg font-semibold">
        Prodotto
      </span>
      <span className="flex h-full w-full flex-col items-center justify-center px-2 text-lg font-semibold">
        Quantità
      </span>
      <span className=" flex h-full w-full flex-col items-center justify-center px-2 text-lg font-semibold">
        Prezzo
      </span>
      <span className=" flex h-full w-full flex-col items-center justify-center px-2 text-lg font-semibold">
        Totale
      </span>
    </div>
  );
}

export default TitoloTabellaCarrello;
