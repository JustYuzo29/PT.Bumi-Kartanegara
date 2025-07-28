// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";

import Site from "./pages/Site";
import Monitoring from "./pages/Monitoring";
import User from "./pages/User";
import Code from "./pages/Code";
import CodeEditor from "./pages/CodeEditor";
import Configuration from "./pages/Configuration";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-[var(--color-snow)] dark:bg-[var(--color-navy)]">
        <Sidebar isMobileOpen={isSidebarOpen} onClose={closeSidebar} />

        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={closeSidebar}></div>
        )}

        <div className="flex flex-col flex-grow min-w-0 md:pl-64">
          <Topbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

          <main className="flex-grow overflow-auto min-w-0">
            <div className="container mx-auto px-4 py-6 min-w-0">
              <Routes>
                <Route path="/" element={<Site />} />
                <Route path="/monitoring" element={<Monitoring />} />
                <Route path="/user" element={<User />} />
                <Route path="/code" element={<Code />} />
                <Route path="/config" element={<Configuration />} />
                <Route path="/edit-code/:fileKey" element={<CodeEditor />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;