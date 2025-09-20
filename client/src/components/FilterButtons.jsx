export const FilterButtons = ({ selectedPeriod, setSelectedPeriod }) => {
  const periods = ["All Time", "Last 6 Months", "Last 4 Weeks"];

  return (
    <div className="flex justify-center items-center gap-5">
      {periods.map((period) => (
        <button
          key={period} // Stable and unique key
          onClick={() => setSelectedPeriod(period)}
          className={`
            text-[#b9b9b9] 
            hover:text-white hover:font-semi-bold 
            cursor-pointer
            ${
              period === selectedPeriod
                ? "text-white font-bold underline underline-offset-5"
                : ""
            }
          `}
        >
          {period}
        </button>
      ))}
    </div>
  );
};
