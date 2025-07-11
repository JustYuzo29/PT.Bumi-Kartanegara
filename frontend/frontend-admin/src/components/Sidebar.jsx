import React from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { label: "Site", path: "/" },
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
          Welcome
        </p>
        <p className="text-base font-bold">NAMA ADMIN</p>
        <p className="text-sm text-[var(--color-cloud)]">skajaksj@gmail.com</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-10 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`cursor-pointer text-sm font-semibold h-10 flex items-center ml-4 pr-4 rounded-l-full transition-all duration-300 ${
                isActive 
                  ? "bg-[var(--color-snow)] text-[var(--color-navy)]" // Use var(--color-navy) for active text color in light mode
                  : "text-white" // Inactive text is white for the current dark blue background
              }`}
            >
              <span className="pl-8">{item.label.toUpperCase()}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 mt-20 mb-8">
        <button
          className="w-full py-3 rounded-full 
                     bg-[var(--color-midnight)] 
                     hover:bg-[var(--color-navy)] 
                     transition text-white text-sm font-semibold"
        >
          LOGOUT
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;