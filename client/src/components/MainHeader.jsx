export const MainHeader = ({ title, children }) => {
  return (
    <header className="flex flex-col md:flex-row md:justify-between items-center gap-5 md:gap-0 mb-8 md:mb-12">
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </header>
  );
};
