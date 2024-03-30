function Form({ children, onSubmit, additionalCss }) {
  return (
    <form
      className={`flex w-full flex-col gap-4 ${additionalCss}`}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}

export default Form;
