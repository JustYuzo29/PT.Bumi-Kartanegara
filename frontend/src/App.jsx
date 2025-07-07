// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/admin/Header';
import Sidebar from './components/admin/Sidebar';
import Dashboard from './pages/admin/Dashboard';
import Monitoring from './pages/admin/Monitoring';
import User from './pages/admin/User';
import Code from './pages/admin/Code';
import Configuration from './pages/admin/Configuration';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Tambahkan state baru untuk mengontrol visibilitas sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default true agar sidebar terlihat saat awal

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Fungsi untuk mengubah status sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <Router>
      <div className={`flex h-screen transition-colors duration-300
        ${isDarkMode ? 'bg-[var(--color-dark-content-bg)] text-[var(--color-dark-text-primary)]' : 'bg-[var(--color-light-content-bg)] text-[var(--color-light-text-primary)]'}`}>
        {/* Teruskan isSidebarOpen ke Sidebar */}
        <Sidebar isDarkMode={isDarkMode} isSidebarOpen={isSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Teruskan toggleSidebar ke Header */}
          <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} toggleSidebar={toggleSidebar} />
          <main id="main-content" className={`p-6 flex-1 overflow-y-auto transition-colors duration-300
            ${isDarkMode ? 'bg-[var(--color-dark-content-bg)]' : 'bg-[var(--color-light-content-bg)]'}`}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard isDarkMode={isDarkMode} />} />
              <Route path="/monitoring" element={<Monitoring isDarkMode={isDarkMode} />} />
              <Route path="/user" element={<User isDarkMode={isDarkMode} />} />
              <Route path="/code" element={<Code isDarkMode={isDarkMode} />} />
              <Route path="/configuration" element={<Configuration isDarkMode={isDarkMode} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;