export const Overlay = ({
  position = "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
  wrapperSize = "w-full h-full",
  rounded = "",
  messageSize = "w-4 h-4",
  message = "i",
}) => {
  return (
    //! We must add the "relative" and "group" classes on the parent element where the component is going to be used.
    // These classes work together with the use of the "group-*" class on the child element
    <div
      className={`opacity-0 group-hover:opacity-100 ${position} ${wrapperSize} flex justify-center items-center bg-black/65 ${rounded}`}
    >
      <span
        className={`${messageSize} rounded-full flex justify-center items-center bg-white/60 text-black/65 text-xl font-bold p-4`}
      >
        {message}
      </span>
    </div>
  );
};
