import React from "react";
import { BellIcon, DocumentTextIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Topbar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <header className="w-full
      bg-[var(--color-warning)] dark:bg-[var(--color-midnight)]
      px-4 md:px-6 h-20 shadow-elevated flex items-center justify-between z-50"
    >
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

      {/* Left Section (Hidden on Mobile) */}
      <div className="hidden md:flex items-center space-x-3 min-w-[250px]">
        <DocumentTextIcon className="h-6 w-6 text-white" />
        <select className="w-48 bg-white dark:bg-[var(--color-snow)] text-black text-sm px-3 py-1 rounded-md border border-gray-300 dark:border-transparent focus:outline-none">
          <option>Admin</option>
          <option>Superadmin</option>
        </select>
      </div>

      {/* Search Bar (Hidden on Mobile) */}
      <div className="hidden md:flex flex-1 justify-end pr-4">
        <input
          type="text"
          placeholder="SEARCH"
          className="w-[300px] px-4 py-1 rounded-full border border-black dark:border-transparent text-sm
          bg-white dark:bg-[var(--color-snow)] text-black placeholder-black shadow"
        />
      </div>

      {/* Notification Icon */}
      <div className="text-white">
        <BellIcon className="h-6 w-6" />
      </div>
    </header>
  );
};

export default Topbar;