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
        w-full h-20 flex-none shrink-0
        bg-[var(--color-warning)] dark:bg-[var(--color-midnight)]
        px-4 md:px-6 shadow-elevated
        flex items-center justify-between gap-4
        z-50
      "
    >
      {/* Kiri: Burger, Icon Dokumen, Dropdown */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Burger hanya mobile */}
        <button
          onClick={toggleSidebar}
          className="text-white transition-transform duration-300 md:hidden"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? (
            <XMarkIcon className="h-6 w-6 rotate-180" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>

        <DocumentTextIcon className="h-6 w-6 text-white" />

        {/* Dropdown hanya desktop */}
        <select
          className="
            hidden md:block
            h-10 w-40 px-3
            rounded-md border border-gray-300 dark:border-transparent
            bg-white dark:bg-[var(--color-snow)]
            text-black text-sm outline-none
          "
          defaultValue="Admin"
        >
          <option>Admin</option>
          <option>Superadmin</option>
        </select>
      </div>

      {/* Kanan: Search + Bell */}
      <div className="flex items-center gap-3 min-w-0">
        <input
          type="text"
          placeholder="Cari..."
          className="
            h-10 w-full md:w-64 flex-shrink px-4
            rounded-full border border-black dark:border-transparent
            bg-white dark:bg-[var(--color-snow)]
            text-black placeholder-black text-sm outline-none shadow
            min-w-0
          "
        />
        <button
          className="h-10 w-10 rounded-full bg-white/90 dark:bg-[var(--color-snow)] grid place-items-center"
          aria-label="Notifikasi"
        >
          <BellIcon className="h-5 w-5 text-black" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
