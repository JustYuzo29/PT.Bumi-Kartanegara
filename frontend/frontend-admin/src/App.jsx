import React, { useState } from "react";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen w-full bg-[var(--color-snow)] dark:bg-[var(--color-ocean)] overflow-hidden">
      {/* Sidebar responsif */}
      <Sidebar isSidebarOpen={isSidebarOpen} />

      {/* Konten kanan */}
      <div className="flex flex-col flex-grow md:pl-64">
        <Topbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-grow p-6">
          {/* Tidak ada konten halaman, fokus Topbar & Sidebar */}
        </main>
      </div>
    </div>
  );
}

export default App;