import React from "react";
import { BellIcon, DocumentTextIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Topbar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <header
      className="
        w-full
        bg-[var(--color-warning)] dark:bg-[var(--color-midnight)]
        px-4 md:px-6
        h-20 py-4.5
        shadow-elevated
        flex flex-col md:flex-row items-center justify-between gap-4
        z-50
      "
    >
      {/* Top Row: Left - Hamburger + Icon */}
      <div className="flex items-center justify-between w-full md:w-auto">
        {/* Hamburger (Mobile Only) */}
        <div className="md:hidden">
          <button onClick={toggleSidebar} className="text-white transition-transform duration-300">
            {isSidebarOpen ? (
              <XMarkIcon className="h-6 w-6 rotate-180" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Left Icon + Dropdown */}
        <div className="flex items-center space-x-3">
          <DocumentTextIcon className="h-6 w-6 text-white" />
          <select className="w-40 bg-white dark:bg-[var(--color-snow)] text-black text-sm px-3 py-1 rounded-md border border-gray-300 dark:border-transparent focus:outline-none">
            <option>Admin</option>
            <option>Superadmin</option>
          </select>
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full md:w-auto flex justify-between md:justify-end items-center gap-4">
        <input
          type="text"
          placeholder="SEARCH"
          className="
            w-full md:w-[300px]
            px-4 py-1 rounded-full border border-black dark:border-transparent
            text-sm bg-white dark:bg-[var(--color-snow)] text-black placeholder-black shadow
          "
        />
        <div className="text-white">
          <BellIcon className="h-6 w-6" />
        </div>
      </div>
    </header>
  );
};

export default Topbar;