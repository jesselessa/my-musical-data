export const Loader = () => {
  const delays = ["250ms", "715ms", "475ms", "25ms", "190ms"];

  return (
    <div className="flex justify-center items-center w-full h-[90vh]">
      <div className="flex justify-center items-end overflow-hidden w-[100px] min-w-[100px] h-[50px] m-auto relative z-20">
        {delays.map((delay, index) => (
          <div
            key={index}
            className={`
              w-[10px] h-[5px] mx-[2px] bg-gray-500
              animate-[dance_400ms_linear_infinite_alternate]
              [animation-delay:${delay}]
            `}
          ></div>
        ))}
      </div>
      <style>{`
        @keyframes dance {
          from {
            height: 10px;
          }
          to {
            height: 100%;
          }
        }
      `}</style>
    </div>
  );
};
