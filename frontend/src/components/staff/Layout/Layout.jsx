import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

export const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen text-[var(--color-bg-light)] dark:text-[var(--color-text-light)] font-body">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col flex-1 min-w-0 md:pl-72">
        <Navbar toggleSidebar={toggleSidebar} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[var(--color-bg-light)] dark:bg-[var(--color-bg-light)] p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
