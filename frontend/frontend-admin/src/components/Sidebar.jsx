import React, { useState } from "react";

const menuItems = ["Site", "Monitoring", "User", "Code", "Configuration"];

const Sidebar = ({ isMobileOpen = false, onClose = () => {} }) => {
  const [active, setActive] = useState("Site");

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

      {/* Menu & Logout area */}
      <div className="flex flex-col flex-1 justify-between px-4 pt-12">
        {/* Menu List */}
        <div className="flex flex-col gap-8">
          {menuItems.map((item) => {
            const isActive = active === item;
            return (
              <div
                key={item}
                onClick={() => {
                  setActive(item);
                  onClose();
                }}
                className="relative cursor-pointer flex items-center h-12 rounded-l-full overflow-hidden select-none"
                style={{ overflow: "visible" }}
              >
                {/* Hover background */}
                <div
                  className={`absolute inset-y-0 left-0 right-0 rounded-l-full transition-opacity duration-300
                    ${isActive ? "opacity-100" : "opacity-0"}`}
                  style={{
                    pointerEvents: "none",
                    width: "calc(100% + 20px)",
                    right: "-20px",
                    backgroundColor: isActive ? "var(--color-snow)" : "transparent",
                    boxShadow: isActive
                      ? "0 0 10px 5px rgba(255, 255, 255, 0.15)"
                      : "none",
                  }}
                />
                {/* Override warna hover untuk dark mode */}
                <style>
                  {`
                    @media (prefers-color-scheme: dark) {
                      div[style*="background-color: var(--color-snow)"] {
                        background-color: var(--color-navy) !important;
                        box-shadow: 0 0 10px 5px rgba(11, 25, 44, 0.7) !important;
                      }
                    }
                  `}
                </style>
                {/* Text */}
                <span
                  className={`relative z-10 pl-6 font-semibold text-base ${
                    isActive ? "text-black" : "text-white"
                  }`}
                >
                  {item.toUpperCase()}
                </span>
              </div>
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