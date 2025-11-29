import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

// Language Provider
import { LanguageProvider } from "./locales/language.jsx";

// Auth Components
import LoginPage from "./components/auth/LoginPage";

// Public Components
import Navbar from "./components/public/Navbar";
import Footer from "./components/public/Footer";

// Public Pages
import Home from "./Pages/public/Home";
import About from "./Pages/public/About";
import Media from "./Pages/public/Media";
import Service from "./Pages/public/Service";
import Contact from "./Pages/public/Contact";

// Admin Components
import Topbar from "./components/admin/Topbar";
import Sidebar from "./components/admin/Sidebar";

// Admin Pages
import AdminDashboard from "./Pages/admin/AdminDashboard";
import Monitoring from "./Pages/admin/Monitoring";
import User from "./Pages/admin/User";
import Code from "./Pages/admin/Code";
import CodeEditor from "./Pages/admin/CodeEditor";
import Configuration from "./Pages/admin/Configuration";

// Staff Components and Pages
import StaffLayout from "./components/staff/Layout/Layout";
import StaffRouter from "./routes/StaffRouter";

// Auth guard with role check
function RequireAuth({ allowedRole }) {
  const token = localStorage.getItem("access_token");
  const tipe = localStorage.getItem("tipe");

  if (!token) return <Navigate to="/login" replace />;
  if (allowedRole && tipe !== allowedRole) return <Navigate to="/unauthorized" replace />;
  return <Outlet />;
}

// Public layout wrapper
function PublicLayout() {
  return (
    <LanguageProvider>
      <div className="min-h-screen overflow-x-hidden hide-scrollbar">
        <Navbar />
        <main className="w-full overflow-x-hidden hide-scrollbar">
          <Outlet />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
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
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={closeSidebar}></div>
      )}
      <div className="flex flex-col flex-grow min-w-0 md:pl-64">
        <Topbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-grow min-w-0 overflow-auto">
          <div className="container min-w-0 px-4 py-6 mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

// Staff layout wrapper with protected routes
function StaffProtectedLayout() {
  const isAuthenticated = localStorage.getItem("isStaffLoggedIn") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <StaffLayout>
      <StaffRouter />
    </StaffLayout>
  );
}

// Main App Root
export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes with Layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/media" element={<Media />} />
          <Route path="/service" element={<Service />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Login Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Protected Routes */}
        <Route element={<RequireAuth allowedRole="admin" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="monitoring" element={<Monitoring />} />
            <Route path="user" element={<User />} />
            <Route path="code" element={<Code />} />
            <Route path="edit-code/:fileKey" element={<CodeEditor />} />
            <Route path="configuration" element={<Configuration />} />
          </Route>
        </Route>

        {/* Staff Protected Routes */}
        <Route path="/staff/*" element={<StaffProtectedLayout />} />

        {/* Unauthorized access page */}
        <Route
          path="/unauthorized"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-red-600">403</h1>
                <p className="text-xl text-gray-600 mt-4">Akses Ditolak</p>
                <p className="text-gray-500 mt-2">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
              </div>
            </div>
          }
        />

        {/* Catch-all route for any undefined path */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
