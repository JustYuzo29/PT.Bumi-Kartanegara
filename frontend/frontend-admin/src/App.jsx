// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

import Site from './pages/Site';
import Monitoring from "./pages/Monitoring";
import User from "./pages/User";
import Code from './pages/Code';
import Configuration from "./pages/Configuration";
// import halaman lain jika ada

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <Router>
      <div className="flex h-screen w-full bg-[var(--color-snow)] dark:bg-[var(--color-navy)] overflow-hidden relative">
        {/* Sidebar responsif */}
        <Sidebar isMobileOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* Backdrop untuk mobile drawer */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Konten kanan */}
        <div className="flex flex-col flex-grow md:pl-64">
          <Topbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

          <main className="flex-grow p-6 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Site />} />
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="/user" element={<User />} />
              <Route path="/code" element={<Code />} />
              <Route path="/config" element={<Configuration />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;