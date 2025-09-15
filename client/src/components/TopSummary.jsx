export const TopSummary = ({
  title,
  category,
  listComponent: ListComponent,
  listWrapperClass,
}) => {
  return (
    <section className="w-1/2 flex-1 flex flex-col">
      <header className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold">{title}</h2>
        {/*If clicked, displays Top 20 */}
        <button className="text-xs font-semibold tracking-[1px] rounded-3xl border-1 border-white py-1.5 px-4 hover:bg-white hover:text-[#121212] transition-colors duration-200 ease-in-out cursor-pointer">
          SEE MORE
        </button>
      </header>

      {/* By default, shows a Top 10 list */}
      <ListComponent category={category} className={listWrapperClass} />
    </section>
  );
};
