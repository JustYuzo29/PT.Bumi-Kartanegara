import React from "react";

const SectionCard = ({ children }) => (
  <div className="bg-[var(--color-white)] dark:bg-[var(--color-ocean)] rounded-xl shadow-lg px-6 pb-8 pt-4">
    {children}
  </div>
);

export default SectionCard;