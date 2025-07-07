// src/components/Header.jsx
import React from 'react';
// Import ikon dari Heroicons
import {
  ArchiveBoxIcon, // Untuk ikon tumpukan kartu (light mode)
  CubeIcon,       // Untuk ikon kotak (dark mode)
  BellIcon,       // Untuk ikon lonceng
  Bars3Icon,      // Ikon burger (menu)
  XMarkIcon,      // Ikon silang (tutup)
} from '@heroicons/react/24/solid'; // Menggunakan solid icons

// Import komponen Switch yang Anda berikan
import Switch from './Switch'; // Pastikan file Switch.jsx ada di folder components

// Tambahkan toggleSidebar sebagai prop
const Header = ({ isDarkMode, toggleTheme, toggleSidebar, isSidebarOpen }) => {
  return (
    <header className={`p-4 flex items-center justify-between shadow-md z-10 transition-colors duration-300
      ${isDarkMode ? 'bg-[var(--color-dark-header-bg)]' : 'bg-[var(--color-light-header-bg)]'}`}>
      {/* Bagian Kiri: Ikon Kiri, Dropdown Admin, dan Bilah Pencarian */}
      <div className="flex items-center space-x-4">
        {/* Tombol Burger Menu */}
        <button
          onClick={toggleSidebar}
          className={`text-2xl transition-colors duration-300 ${isDarkMode ? 'text-[var(--color-dark-bell-icon)]' : 'text-[var(--color-light-bell-icon)]'}`}
        >
          {isSidebarOpen ? (
            <XMarkIcon className="w-6 h-6" /> // Menampilkan X jika sidebar terbuka
          ) : (
            <Bars3Icon className="w-6 h-6" /> // Menampilkan burger jika sidebar tertutup
          )}
        </button>

        {/* Ikon Kiri (berubah sesuai mode) */}
        <div className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors duration-300
          ${isDarkMode ? 'bg-[var(--color-dark-left-icon-bg)]' : 'bg-[var(--color-light-left-icon-bg)]'}`}>
          {isDarkMode ? (
            <CubeIcon className={`w-6 h-6 ${isDarkMode ? 'text-[var(--color-dark-left-icon-color)]' : 'text-[var(--color-light-left-icon-color)]'}`} />
          ) : (
            <ArchiveBoxIcon className={`w-6 h-6 ${isDarkMode ? 'text-[var(--color-dark-left-icon-color)]' : 'text-[var(--color-light-left-icon-color)]'}`} />
          )}
        </div>
        <div className="relative">
          <select className={`py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300
            ${isDarkMode ? 'bg-[var(--color-dark-input-bg)] text-[var(--color-dark-text-primary)]' : 'bg-[var(--color-light-input-bg)] text-[var(--color-light-input-placeholder)]'}`}>
            <option>Admin</option>
            {/* Tambahkan opsi lain di sini jika diperlukan */}
          </select>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="SEARCH"
            className={`py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-colors duration-300
              ${isDarkMode ? 'bg-[var(--color-dark-input-bg)] text-[var(--color-dark-text-primary)] placeholder-[var(--color-dark-input-placeholder)]' : 'bg-[var(--color-light-input-bg)] text-[var(--color-light-input-placeholder)]'}`}
          />
        </div>
      </div>

      {/* Bagian Kanan: Toggle Mode dan Ikon Lonceng */}
      <div className="flex items-center space-x-6">
        {/* Menggunakan komponen Switch yang Anda berikan */}
        <Switch checked={isDarkMode} onChange={toggleTheme} />

        {/* Ikon Lonceng */}
        <button className={`text-2xl transition-colors duration-300 ${isDarkMode ? 'text-[var(--color-dark-bell-icon)]' : 'text-[var(--color-light-bell-icon)]'}`}>
          <BellIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;