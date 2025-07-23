// src/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { label: "Situs", path: "/" },
  { label: "Monitoring", path: "/monitoring" },
  { label: "User", path: "/user" },
  { label: "Code", path: "/code" },
  { label: "Configuration", path: "/config" },
];

const Sidebar = ({ isMobileOpen = false, onClose = () => {} }) => {
  const location = useLocation();

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen w-64 flex flex-col shadow-elevated z-[60]
        bg-[var(--color-navy)] text-white
        dark:bg-[#0B192C] dark:text-white
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:block
      `}
    >
      {/* Tombol close (mobile) */}
      <div className="md:hidden absolute top-4 right-4 z-[61]">
        <button
          onClick={onClose}
          aria-label="Close sidebar"
          className="text-white text-2xl font-bold leading-none"
        >
          ×
        </button>
      </div>

      {/* Profile + Dropdown (mobile only) */}
      <div className="text-center mt-10 px-4">
        <div className="w-24 h-24 rounded-full bg-[var(--color-midnight)] mx-auto" />
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider">
          Selamat Datang
        </p>
        <p className="text-base font-bold">ADMIN JEKI</p>
        <p className="text-sm">admin@gmail.com</p>

        {/* Dropdown Admin hanya mobile */}
        <div className="mt-4 md:hidden">
          <select
            className="
              w-full h-10 px-3 rounded-md text-sm outline-none
              bg-white text-black border border-gray-300
              dark:bg-[var(--color-ocean)] dark:text-white dark:border-transparent
            "
            defaultValue="Admin"
          >
            <option>Admin</option>
            <option>Superadmin</option>
          </select>
        </div>
      </div>

      {/* Menu & Logout */}
      <div className="flex flex-col flex-1 justify-between px-4 pt-8">
        <nav className="flex flex-col gap-8">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className="relative flex items-center h-12 rounded-l-full select-none"
                style={{ overflow: "visible" }}
              >
                {/* background pill for active state */}
                <span
                  className={`
                    absolute inset-y-0 left-0 rounded-l-full transition-opacity duration-300
                    ${isActive ? "opacity-100" : "opacity-0"}
                  `}
                  style={{
                    pointerEvents: "none",
                    width: "calc(100% + 16px)",
                    right: "-100px",
                    backgroundColor: isActive
                      ? "var(--color-snow)" // light active bg
                      : "transparent",
                  }}
                />
                {/* Dark mode override for active bg */}
                {isActive && (
                  <span
                    className="absolute inset-y-0 left-0 rounded-l-full opacity-0 dark:opacity-100"
                    style={{
                      pointerEvents: "none",
                      width: "calc(100% + 16px)",
                      right: "-100px",
                      backgroundColor: "var(--color-navy)", // active pill dark
                    }}
                  />
                )}

                <span
                  className={`
                    relative z-10 pl-6 font-semibold text-base
                    ${isActive ? "text-black dark:text-white" : "text-white"}
                  `}
                >
                  {item.label.toUpperCase()}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-2 mt-20 mb-8">
          <button
            className="w-full py-3 rounded-full text-sm font-semibold text-white
                       bg-[var(--color-midnight)] hover:bg-[var(--color-navy)]
                       transition-colors"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;