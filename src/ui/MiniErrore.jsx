function MiniErrore({ error }) {
  return (
    <div className="flex h-fit  w-fit justify-center place-self-center ">
      <span className=" text-pretty break-words px-1 py-1  text-red-400">
        {error}
      </span>
    </div>
  );
}

export default MiniErrore;
