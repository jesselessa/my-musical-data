export const TopSummary = ({
  title,
  category,
  listComponent: ListComponent,
}) => {
  return (
    <section className="w-1/2 border-1">
      <header className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold">{title}</h2>
        <button className="text-xs font-semibold tracking-[1px] rounded-3xl border-1 border-white py-1.5 px-4 hover:bg-white hover:text-[#121212] transition-colors duration-200 ease-in-out cursor-pointer">
          SEE MORE
        </button>
        {/*If clicked, displays Top 20 */}
      </header>

      {/* Top 10 list */}
      <ListComponent category={category} />
    </section>
  );
};
