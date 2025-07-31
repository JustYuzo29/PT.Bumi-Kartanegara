import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

// Auth
import LoginPage from "./components/auth/LoginPage";

// Layout components
import Topbar from "./components/frontend-admin/Topbar";
import Sidebar from "./components/frontend-admin/Sidebar";

// Admin pages
import Site from "./pages/frontend-admin/Site";
import Monitoring from "./pages/frontend-admin/Monitoring";
import User from "./pages/frontend-admin/User";
import Code from "./pages/frontend-admin/Code";
import CodeEditor from "./pages/frontend-admin/CodeEditor";
import Configuration from "./pages/frontend-admin/Configuration";

// Auth guard
function RequireAuth() {
  const token = localStorage.getItem("access_token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

// Admin layout wrapper
function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
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
              <Route path="/dashboard" element={<Site />} />
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="/user" element={<User />} />
              <Route path="/code" element={<Code />} />
              <Route path="/edit-code/:fileKey" element={<CodeEditor />} />
              <Route path="/config" element={<Configuration />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

// App root
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected admin layout */}
        <Route element={<RequireAuth />}>
          <Route path="/*" element={<AdminLayout />} />
        </Route>

        {/* Fallback to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
