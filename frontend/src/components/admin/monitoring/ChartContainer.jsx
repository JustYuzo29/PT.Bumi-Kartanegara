import React from "react";

const ChartContainer = ({ children }) => {
  return (
    <div
      className="rounded-xl shadow-lg p-4 sm:p-6 md:p-10
                 bg-[var(--color-white)] dark:bg-[var(--color-ocean)]
                 w-full 
                 aspect-[16/9] min-h-[300px]
                 border border-[#d4e5f7] dark:border-none"
    >
      {children}
    </div>
  );
};

export default ChartContainer;
