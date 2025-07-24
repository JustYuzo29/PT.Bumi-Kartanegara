import React from "react";

const ChartContainer = ({ children }) => {
  return (
    <div
      className="rounded-xl shadow-lg p-4 sm:p-6 md:p-10
                 bg-[var(--color-white)] dark:bg-[var(--color-ocean)]
                 w-full max-w-2xl md:max-w-3xl mx-auto
                 h-60 sm:h-72 md:h-96
                 border border-[#d4e5f7] dark:border-none"
    >
      {children}
    </div>
  );
};

export default ChartContainer;
