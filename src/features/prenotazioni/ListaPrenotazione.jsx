function ListaPrenotazione({ children, label }) {
  return (
    <>
      <h2 className="place-self-start text-2xl font-bold">{label}</h2>
      <ul className="flex flex-wrap items-center justify-center gap-8">
        {children}
      </ul>
    </>
  );
}

export default ListaPrenotazione;
