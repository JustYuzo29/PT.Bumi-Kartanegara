// components/code/CodeCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const CodeCard = ({ title, buttonText, fileKey }) => {
  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <h1 className="text-xl font-extrabold mb-4 text-[var(--color-navy)] dark:text-white">
        {title}
      </h1>
      <Link
        to={`/edit-code/${fileKey}`}
        className="block text-center bg-[var(--color-midnight)] text-white 
                   hover:bg-[var(--color-snow)] hover:text-[var(--color-navy)]
                   font-semibold text-sm py-4 rounded-xl shadow transition-colors duration-200 ease-in-out
                   dark:hover:text-black"
      >
        {buttonText}
      </Link>
    </div>
  );
};

export default CodeCard;
