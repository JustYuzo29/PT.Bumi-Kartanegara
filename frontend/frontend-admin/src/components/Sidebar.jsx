import React, { useState } from "react";

const menuItems = ["Site", "Monitoring", "User", "Code", "Configuration"];

const Sidebar = () => {
  const [active, setActive] = useState("Site");

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-[var(--color-ocean)] text-[var(--color-text)] flex flex-col justify-between z-50 shadow-elevated">
      
      {/* Profile */}
      <div className="text-center mt-10 px-4">
        <div className="w-24 h-24 rounded-full bg-[var(--color-midnight)] mx-auto" />
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider">Welcome</p>
        <p className="text-base font-bold">NAMA ADMIN</p>
        <p className="text-sm text-[var(--color-cloud)]">skajaksj@gmail.com</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-10 space-y-2">
        {menuItems.map((item) => {
          const isActive = active === item;
          return (
            <div
              key={item}
              onClick={() => setActive(item)}
              className={`cursor-pointer text-sm font-semibold h-10 flex items-center ml-4 pr-4 rounded-l-full transition-all duration-300 ${
                isActive ? "bg-[var(--color-snow)] text-black" : "text-[var(--color-text)]"
              }`}
            >
              <span className="pl-8">{item.toUpperCase()}</span>
            </div>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="mb-6 px-6">
        <button className="w-full py-2 rounded-full bg-[var(--color-midnight)] hover:bg-[var(--color-navy)] transition text-[var(--color-text)] text-xs font-semibold">
          LOGOUT
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;