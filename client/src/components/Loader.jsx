export const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-[90vh]">
      <div className="flex justify-center items-end overflow-hidden w-[100px] min-w-[100px] h-[50px] m-auto relative z-20">
        <div className="w-[10px] h-[5px] mx-[2px] bg-[#b9b9b9] animate-[dance_400ms_linear_infinite_alternate] [animation-delay:250ms]"></div>
        <div className="w-[10px] h-[5px] mx-[2px] bg-[#b9b9b9] animate-[dance_400ms_linear_infinite_alternate] [animation-delay:715ms]"></div>
        <div className="w-[10px] h-[5px] mx-[2px] bg-[#b9b9b9] animate-[dance_400ms_linear_infinite_alternate] [animation-delay:475ms]"></div>
        <div className="w-[10px] h-[5px] mx-[2px] bg-[#b9b9b9] animate-[dance_400ms_linear_infinite_alternate] [animation-delay:25ms]"></div>
        <div className="w-[10px] h-[5px] mx-[2px] bg-[#b9b9b9] animate-[dance_400ms_linear_infinite_alternate] [animation-delay:190ms]"></div>
      </div>
      <style jsx>{`
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
