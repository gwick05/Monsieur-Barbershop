function Stat({ label, children, className }) {
  return (
    <div
      className={`${className}  w-full   rounded-lg border border-neutral-500 border-opacity-20   bg-neutral-300 px-4 py-2 text-center font-normal  shadow-lg dark:border-neutral-500 dark:bg-neutral-700`}
    >
      <div className="grid place-content-center ">
        <h3 className="font-bold">{label}</h3>
        {children}
      </div>
    </div>
  );
}

export default Stat;
