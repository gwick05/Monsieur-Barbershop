function Container({ children }) {
  return (
    <div className="flex h-6/8 flex-col items-center overflow-auto bg-neutral-100 text-neutral-700 transition-colors duration-500 dark:bg-neutral-900 dark:text-neutral-50 ">
      {children}
    </div>
  );
}

export default Container;
