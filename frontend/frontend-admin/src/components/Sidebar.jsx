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
        fixed top-0 left-0 h-screen w-64 
        bg-[var(--color-navy)] text-white 
        dark:bg-[var(--color-ocean)] 
        flex flex-col z-[60] shadow-elevated
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:block
      `}
    >
      {/* Tombol close (mobile) */}
      <div className="md:hidden absolute top-4 right-4 z-[61]">
        <button onClick={onClose} className="text-white text-xl font-bold">
          ×
        </button>
      </div>

      {/* Profile */}
      <div className="text-center mt-10 px-4">
        <div className="w-24 h-24 rounded-full bg-[var(--color-midnight)] mx-auto" />
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider">
          Selamat Datang
        </p>
        <p className="text-base font-bold">ADMIN JEKI</p>
        <p className="text-sm">admin@gmail.com</p>

        {/* Dropdown Admin hanya muncul di mobile */}
        <div className="mt-4 md:hidden">
          <select
            className="w-full bg-white dark:bg-[var(--color-snow)] text-black dark:text-[var(--color-navy)] text-sm px-3 py-1 rounded-md border border-gray-300 dark:border-transparent focus:outline-none"
          >
            <option>Admin</option>
            <option>Superadmin</option>
          </select>
        </div>
      </div>

      {/* Menu & Logout */}
      <div className="flex flex-col flex-1 justify-between px-4 pt-8">
        <div className="flex flex-col gap-8">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className="relative cursor-pointer flex items-center h-12 rounded-l-full overflow-hidden select-none"
                style={{ overflow: "visible" }}
              >
                <div
                  className={`absolute inset-y-0 left-0 right-0 rounded-l-full transition-opacity duration-300
                    ${isActive ? "opacity-100" : "opacity-0"}`}
                  style={{
                    pointerEvents: "none",
                    width: "calc(100% + 16px)",
                    right: "-100px",
                    backgroundColor: isActive
                      ? "var(--color-snow)"
                      : "transparent",
                  }}
                />
                <span
                  className={`relative z-10 pl-6 font-semibold text-base ${
                    isActive ? "text-black" : "text-white"
                  }`}
                >
                  {item.label.toUpperCase()}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <div className="px-2 mt-20 mb-8">
          <button
            className="w-full py-3 rounded-full 
                            bg-[var(--color-midnight)] 
                            hover:bg-[var(--color-navy)] 
                            transition text-white text-sm font-semibold"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
