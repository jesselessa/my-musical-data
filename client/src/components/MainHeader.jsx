export const MainHeader = ({ title, children }) => {
  return (
    <header className="flex justify-between items-center mb-12">
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </header>
  );
};
