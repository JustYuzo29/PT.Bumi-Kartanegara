// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
// Import ikon dari Heroicons
import {
  UserCircleIcon, // Untuk ikon profil
  HomeIcon,       // Untuk Dashboard/SITE
  ChartBarIcon,   // Untuk Monitoring
  UsersIcon,      // Untuk User
  CodeBracketIcon, // Untuk Code
  Cog6ToothIcon,  // Untuk Configuration
  ArrowRightOnRectangleIcon, // Untuk Logout
} from '@heroicons/react/24/solid'; // Menggunakan solid icons

// Tambahkan isSidebarOpen sebagai prop
const Sidebar = ({ isDarkMode, isSidebarOpen }) => {
  return (
    <aside className={`flex-shrink-0 shadow-lg transition-all duration-300 ease-in-out
      ${isDarkMode ? 'bg-[var(--color-dark-sidebar-bg)] text-[var(--color-dark-text-on-dark)]' : 'bg-[var(--color-light-sidebar-bg)] text-[var(--color-light-text-on-dark)]'}
      ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full overflow-hidden'}`}> {/* Tambahkan kelas Tailwind untuk kontrol lebar dan transisi */}
      {/* Bagian Profil - hanya tampilkan jika sidebar terbuka */}
      {isSidebarOpen && (
        <div className="flex flex-col items-center text-center p-4 mb-8">
          <div className={`rounded-full w-24 h-24 flex items-center justify-center mb-4 text-4xl font-bold transition-colors duration-300
            ${isDarkMode ? 'bg-[var(--color-dark-profile-circle)] text-[var(--color-dark-text-on-dark)]' : 'bg-[var(--color-light-profile-circle)] text-[var(--color-light-text-on-dark)]'}`}>
            <UserCircleIcon className="w-16 h-16" /> {/* Ikon pengguna untuk profil */}
          </div>
          <p className="text-lg font-semibold">Selamat Datang</p>
          <p className="text-md">Jeki Ganteng 123</p>
          <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-[var(--color-dark-text-secondary)]' : 'text-[var(--color-light-text-secondary)]'}`}>Admin@gmail.com</p>
        </div>
      )}

      {/* Tautan Navigasi - hanya tampilkan jika sidebar terbuka */}
      {isSidebarOpen && (
        <nav id="sidebar-nav" className="flex-grow p-4">
          <ul>
            <li className="mb-2">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-md transition duration-200
                  ${isActive
                    ? (isDarkMode ? 'bg-[var(--color-dark-sidebar-active)]' : 'bg-[var(--color-light-sidebar-active)]')
                    : (isDarkMode ? 'hover:bg-[var(--color-dark-sidebar-active)]' : 'hover:bg-[var(--color-light-sidebar-active)]')
                  }`
                }
              >
                <HomeIcon className="w-6 h-6 mr-3" /> {/* Ikon Home */}
                <span>SITE</span>
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/monitoring"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-md transition duration-200
                  ${isActive
                    ? (isDarkMode ? 'bg-[var(--color-dark-sidebar-active)]' : 'bg-[var(--color-light-sidebar-active)]')
                    : (isDarkMode ? 'hover:bg-[var(--color-dark-sidebar-active)]' : 'hover:bg-[var(--color-light-sidebar-active)]')
                  }`
                }
              >
                <ChartBarIcon className="w-6 h-6 mr-3" /> {/* Ikon Chart Bar */}
                <span>MONITORING</span>
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/user"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-md transition duration-200
                  ${isActive
                    ? (isDarkMode ? 'bg-[var(--color-dark-sidebar-active)]' : 'bg-[var(--color-light-sidebar-active)]')
                    : (isDarkMode ? 'hover:bg-[var(--color-dark-sidebar-active)]' : 'hover:bg-[var(--color-light-sidebar-active)]')
                  }`
                }
              >
                <UsersIcon className="w-6 h-6 mr-3" /> {/* Ikon Users */}
                <span>USER</span>
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/code"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-md transition duration-200
                  ${isActive
                    ? (isDarkMode ? 'bg-[var(--color-dark-sidebar-active)]' : 'bg-[var(--color-light-sidebar-active)]')
                    : (isDarkMode ? 'hover:bg-[var(--color-dark-sidebar-active)]' : 'hover:bg-[var(--color-light-sidebar-active)]')
                  }`
                }
              >
                <CodeBracketIcon className="w-6 h-6 mr-3" /> {/* Ikon Code Bracket */}
                <span>CODE</span>
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/configuration"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-md transition duration-200
                  ${isActive
                    ? (isDarkMode ? 'bg-[var(--color-dark-sidebar-active)]' : 'bg-[var(--color-light-sidebar-active)]')
                    : (isDarkMode ? 'hover:bg-[var(--color-dark-sidebar-active)]' : 'hover:bg-[var(--color-light-sidebar-active)]')
                  }`
                }
              >
                <Cog6ToothIcon className="w-6 h-6 mr-3" /> {/* Ikon Cog */}
                <span>CONFIGURATION</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      )}

      {/* Tombol Logout - hanya tampilkan jika sidebar terbuka */}
      {isSidebarOpen && (
        <div className="mt-auto p-4">
          <button className={`py-2 px-6 rounded-md w-full transition duration-200 flex items-center justify-center
            ${isDarkMode ? 'bg-[var(--color-dark-logout-button)] hover:filter hover:brightness(1.1) text-[var(--color-dark-button-text)]' : 'bg-[var(--color-light-logout-button)] hover:filter hover:brightness(1.1) text-[var(--color-light-button-text)]'}`}>
            <ArrowRightOnRectangleIcon className="w-6 h-6 mr-3" /> {/* Ikon Logout */}
            <span>LOGOUT</span>
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;