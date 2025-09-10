// components/user/AddButton.jsx
import React from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const AddButton = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center space-x-2 px-4 py-2 bg-[var(--color-navy)] text-white rounded-md hover:bg-[var(--color-ocean)] transition-colors duration-200 shadow-md"
  >
    <PlusCircleIcon className="h-5 w-5" />
    <span>{label}</span>
  </button>
);

export default AddButton;