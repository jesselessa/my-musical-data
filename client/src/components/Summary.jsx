import { useState, useRef } from "react";

export const Summary = ({
  title,
  category,
  listComponent: ListComponent,
  listWrapperClass,
}) => {
  // By default, we show a short list with only 10 items
  // When the user clicks "See More", we show a full list with 20 items
  const [showFullList, setShowFullList] = useState(false);

  // With "useRef", we create a mutable reference that persists throughout the component lifecycle, without re-rendering when its value changes
  const listEndRef = useRef();

  // Function to handle "See More" button click
  const handleSeeMoreClick = () => {
    setShowFullList(true);

    //! State updates in React, like setShowFullList(true), are asynchronous.
    // This means the DOM isn't updated instantly, so an immediate call to scrollIntoView() might fail because the target element isn't rendered yet. We use setTimeout with a 0ms delay to ensure DOM has been updated
    setTimeout(() => {
      listEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }, 0);
  };

  return (
    <section className="w-1/2 flex-1 flex flex-col">
      <header className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold">{title}</h2>
        {/* Show the button only if the full list is not already displayed */}

        {!showFullList && (
          <button
            onClick={handleSeeMoreClick}
            className="text-xs font-semibold tracking-[1px] rounded-3xl border-1 border-white py-1.5 px-4 hover:bg-white hover:text-[#121212] transition-colors duration-200 ease-in-out active:transform active:translate-y-[1px] cursor-pointer"
          >
            SEE MORE
          </button>
        )}
      </header>

      {/* By default, shows a Top 10 list */}
      <ListComponent
        category={category}
        listWrapperClass={listWrapperClass}
        itemsLimit={showFullList ? 20 : 10}
      />

      {/* List end reference */}
      <div ref={listEndRef}></div>
    </section>
  );
};
