// components/user/SectionTitle.jsx
import React from "react";

const SectionTitle = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2 mb-4">
    <Icon className="h-7 w-7 text-[var(--color-navy)] dark:text-white" />
    <h1 className="text-2xl font-extrabold text-[var(--color-navy)] dark:text-white">
      {title}
    </h1>
  </div>
);

export default SectionTitle;