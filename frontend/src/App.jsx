// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/admin/Header';
import Sidebar from './components/admin/Sidebar';
import Dashboard from './pages/admin/Dashboard';
import Monitoring from './pages/admin/Monitoring';
import User from './pages/admin/User';
import Code from './pages/admin/Code';
import Configuration from './pages/admin/Configuration'; // Pastikan ini diimpor dengan benar

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Tambahkan atau hapus kelas 'dark' pada elemen HTML
    if (isDarkMode) {
      document.documentElement.classList.add('dark'); // Gunakan document.documentElement untuk TailwindCSS dark mode
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Opsional: Simpan preferensi mode gelap ke localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Efek untuk memuat preferensi tema dari localStorage saat aplikasi pertama kali dimuat
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []); // Berjalan hanya sekali saat mount

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <Router>
      <div className={`flex h-screen transition-colors duration-300`}>
        {/* Sidebar menerima isSidebarOpen dan isDarkMode */}
        <Sidebar isDarkMode={isDarkMode} isSidebarOpen={isSidebarOpen} />
        <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300
                        ${isSidebarOpen ? 'ml-0' : 'ml-[-256px] md:ml-0' /* Sesuaikan jika sidebar tersembunyi bergeser */}
        `}>
          {/* Header menerima toggleTheme dan toggleSidebar */}
          <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} toggleSidebar={toggleSidebar} />
          <main id="main-content" className={`p-6 flex-1 overflow-y-auto transition-colors duration-300
            ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900' /* Menggunakan warna Tailwind langsung atau pastikan variabel CSS ada */}`}>
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