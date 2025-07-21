import React from "react";
import {
  BellIcon,
  DocumentTextIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Topbar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <header
      className="
        w-full
        bg-[var(--color-warning)] dark:bg-[var(--color-midnight)]
        px-4 md:px-6
        py-4.5 md:py-0 md:h-20
        shadow-elevated
        flex items-center justify-between gap-4
        z-50
      "
    >
      {/* Left: Burger, Icon Dokumen, Dropdown (desktop only) */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="text-white transition-transform duration-300 md:hidden"
        >
          {isSidebarOpen ? (
            <XMarkIcon className="h-6 w-6 rotate-180" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        <DocumentTextIcon className="h-6 w-6 text-white" />

        {/* Dropdown hilang di mobile, tampil desktop */}
        <select className="hidden md:block w-40 bg-white dark:bg-[var(--color-snow)] text-black text-sm px-3 py-1 rounded-md border border-gray-300 dark:border-transparent focus:outline-none">
          <option>Admin</option>
          <option>Superadmin</option>
        </select>
      </div>

      {/* Right: Search Bar + Bell */}
      <div className="flex items-center gap-4 min-w-0">
        <input
          type="text"
          placeholder="Cari..."
          className="
          flex-grow min-w-0 w-full md:max-w-[300px]
          px-4 py-1 rounded-full border border-black dark:border-transparent
          text-sm bg-white dark:bg-[var(--color-snow)] text-black placeholder-black shadow"
        />
        <BellIcon className="h-6 w-6 text-white" />
      </div>
    </header>
  );
};

export default Topbar;
