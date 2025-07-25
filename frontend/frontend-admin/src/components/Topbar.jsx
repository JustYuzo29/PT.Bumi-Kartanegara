import React, { useState } from "react";
import {
  BellIcon,
  DocumentTextIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Topbar = ({ isSidebarOpen, toggleSidebar }) => {
  const [search, setSearch] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  // Dummy notifikasi
  const notifications = [
    { id: 1, text: "User baru mendaftar" },
    { id: 2, text: "Konfigurasi berhasil diupdate" },
  ];

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    // TODO: trigger pencarian global/filter data
    // Bisa gunakan props.onSearch jika ingin lempar ke parent
  };

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
          value={search}
          onChange={handleSearchChange}
          className="
            h-10 w-full md:w-64 flex-shrink px-4
            rounded-full border border-black dark:border-transparent
            bg-white dark:bg-[var(--color-snow)]
            text-black placeholder-black text-sm outline-none shadow
            min-w-0
          "
        />
        <div className="relative">
          <button
            className="h-10 w-10 rounded-full bg-white/90 dark:bg-[var(--color-snow)] grid place-items-center"
            aria-label="Notifikasi"
            onClick={() => setNotifOpen((v) => !v)}
          >
            <BellIcon className="h-5 w-5 text-black" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[var(--color-ocean)] rounded-lg shadow-lg z-50 border border-gray-200 dark:border-gray-700">
              <div className="p-3 font-semibold border-b border-gray-200 dark:border-gray-700">Notifikasi</div>
              {notifications.length === 0 ? (
                <div className="p-3 text-sm text-gray-500">Tidak ada notifikasi</div>
              ) : (
                notifications.map((notif) => (
                  <div key={notif.id} className="p-3 text-sm border-b last:border-b-0 border-gray-100 dark:border-gray-700">
                    {notif.text}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
