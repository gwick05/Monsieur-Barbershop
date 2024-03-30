function FormRow({ children, error }) {
  return (
    <div className="flex w-5/6 flex-col gap-1">
      <div className="flex w-full items-center justify-between py-1">
        {children}
      </div>
      <div className="w-fit"> {error}</div>
    </div>
  );
}

export default FormRow;
