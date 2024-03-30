function PageHeader({ children, additionalCss }) {
  return (
    <h1 className={`px-4 py-6  text-3xl font-extrabold ${additionalCss} `}>
      {children}
    </h1>
  );
}

export default PageHeader;
