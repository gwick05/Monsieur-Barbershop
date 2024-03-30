function getButton({ type, disabled, onClick, children }) {
  switch (type) {
    case 'primary':
      return (
        <button
          disabled={disabled}
          onClick={onClick}
          className="h-fit w-fit rounded-full bg-orange-400  px-4 py-2 outline-none hover:font-semibold hover:ring-2 hover:ring-neutral-700 disabled:bg-neutral-300 dark:hover:ring-neutral-50"
        >
          {children}
        </button>
      );

    case 'primaryFull':
      return (
        <button
          disabled={disabled}
          onClick={onClick}
          className="h-fit w-full rounded-full bg-orange-400  px-4 py-2 outline-none hover:font-semibold hover:ring-2 hover:ring-neutral-700 disabled:bg-neutral-300 dark:hover:ring-neutral-50"
        >
          {children}
        </button>
      );

    case 'secondary':
      return (
        <button
          disabled={disabled}
          onClick={onClick}
          className="w-fit rounded-md bg-orange-400 bg-opacity-15 px-4 py-2 outline-none ring-2 ring-neutral-700 ring-opacity-10 hover:font-semibold hover:ring-2 hover:ring-neutral-700 disabled:bg-neutral-300 dark:ring-neutral-50 dark:ring-opacity-10 dark:hover:ring-neutral-50"
        >
          {children}
        </button>
      );

    default:
      return null;
  }
}

function Button({ children, onClick, disabled, type }) {
  return (
    <>
      {getButton({
        type: type,
        disabled: disabled,
        onClick: onClick,
        children: children,
      })}
    </>
  );
}

export default Button;
