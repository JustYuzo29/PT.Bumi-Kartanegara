import React, { useState, useEffect } from "react";
import {
  BellIcon,
  DocumentTextIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

const Topbar = ({ isSidebarOpen, toggleSidebar }) => {
  const [search, setSearch] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  // Dummy notifikasi
  const notifications = [
    { id: 1, text: "User baru mendaftar" },
    { id: 2, text: "Konfigurasi berhasil diupdate" },
  ];

  // Theme mode: 'light', 'dark', 'system'
  const [themeMode, setThemeMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "dark" || saved === "light" || saved === "system") return saved;
      return "system";
    }
    return "system";
  });
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") return true;
      if (saved === "light") return false;
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) return true;
    }
    return false;
  });

  // Sync isDark and apply theme in real-time
  useEffect(() => {
    let dark = false;
    if (themeMode === "dark") dark = true;
    else if (themeMode === "light") dark = false;
    else dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(dark);
    // Force Tailwind to update theme by toggling class on <html>
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    // Force reflow for Tailwind JIT (fixes some cases)
    root.style.colorScheme = dark ? "dark" : "light";
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  // Listen to system theme changes if mode is 'system'
  useEffect(() => {
    if (themeMode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => {
      setIsDark(e.matches);
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [themeMode]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    // TODO: trigger pencarian global/filter data
    // Bisa gunakan props.onSearch jika ingin lempar ke parent
  };

  return (
    <header
      className="w-full h-20 flex-none shrink-0 bg-[var(--color-warning)] dark:bg-[var(--color-midnight)] px-4 md:px-6 shadow-elevated flex items-center justify-between gap-4 z-50"
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
          className="hidden md:block h-10 w-40 px-3 rounded-md border border-gray-300 dark:border-transparent bg-white dark:bg-[var(--color-snow)] text-black text-sm outline-none"
          defaultValue="Admin"
        >
          <option>Admin</option>
          <option>Superadmin</option>
        </select>
      </div>
      {/* Kanan: Search + Bell + ThemeMode */}
      <div className="flex items-center gap-3 min-w-0">
        <input
          type="text"
          placeholder="Cari..."
          value={search}
          onChange={handleSearchChange}
          className="h-10 w-full md:w-64 flex-shrink px-4 rounded-full border border-black dark:border-transparent bg-white dark:bg-[var(--color-snow)] text-black placeholder-black text-sm outline-none shadow min-w-0"
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
        {/* Toggle modern dark/light mode */}
        <button
          className={`relative w-14 h-8 flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300 focus:outline-none`}
          aria-label="Toggle dark mode"
          onClick={() => {
            if (themeMode === 'system') {
              setThemeMode('light');
            } else {
              setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
            }
          }}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <span className="absolute left-2 top-1/2 -translate-y-1/2">
            <SunIcon className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-yellow-400'}`} />
          </span>
          <span className="absolute right-2 top-1/2 -translate-y-1/2">
            <MoonIcon className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-gray-400'}`} />
          </span>
          <span
            className={`absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white shadow transition-transform duration-300 border border-gray-300 dark:border-gray-600 ${isDark ? 'translate-x-6' : 'translate-x-0'}`}
          />
        </button>
        {/* Tombol mode desktop/system */}
        <button
          className={`h-10 w-10 rounded-full ml-2 flex items-center justify-center border border-gray-200 dark:border-gray-600 bg-white/90 dark:bg-[var(--color-snow)] transition-colors duration-300 ${themeMode === 'system' ? 'ring-2 ring-blue-400' : ''}`}
          aria-label="Ikuti tema desktop"
          title="Ikuti tema desktop"
          onClick={() => setThemeMode('system')}
        >
          {/* Desktop/monitor icon SVG */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 20h8M12 16v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
