import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get user info from localStorage
  const userName = localStorage.getItem("user_name") || "NAMA STAFF";
  const userEmail = localStorage.getItem("user_email") || "staff@email.com";

  const navItems = [
    { label: "HOME", path: "/staff/home" },
    { label: "ABOUT US", path: "/staff/about-us" },
    { label: "MEDIA", path: "/staff/media" },
    { label: "SERVICE", path: "/staff/service" },
    { label: "CONTACT", path: "/staff/contact" },
    { label: "HALAMAN", path: "/staff/halaman" },
  ];

  // Handler logout
  const handleLogout = () => {
    localStorage.removeItem("isStaffLoggedIn");  // Hapus status login
    localStorage.removeItem("access_token");     // Hapus token
    localStorage.removeItem("refresh_token");    // Hapus refresh token
    localStorage.removeItem("user_name");        // Hapus nama user
    localStorage.removeItem("user_email");       // Hapus email user
    localStorage.removeItem("tipe");             // Hapus tipe user
    navigate("/login");                          // Redirect ke halaman login
    if (toggleSidebar) toggleSidebar();          // Tutup sidebar (opsional)
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 sm:w-72 z-40 
        bg-[var(--color-sidebar)] text-white 
        px-6 py-8 sm:px-8 sm:py-10 flex flex-col justify-between 
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div>
          {/* Close Button */}
          <div className="md:hidden flex justify-end mb-6">
            <button onClick={toggleSidebar} aria-label="Tutup Sidebar">
              <XMarkIcon className="w-6 h-6 text-white dark:text-[var(--color-accent)]" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex items-center gap-4 mb-12">
            {/* Company Logo */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <div className="text-sm sm:text-lg font-bold font-heading text-white dark:text-accent">
                {userName}
              </div>
              <div className="text-xs text-white/80 dark:text-white/60">
                {userEmail}
              </div>
              <div className="text-xs text-white/80 dark:text-white/60 font-semibold mt-1">
                PT. BUMI KARTANEGARA
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav>
            <ul className="flex flex-col gap-3 sm:gap-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={toggleSidebar}
                    className={`block py-2.5 sm:py-3 pl-2 sm:pl-6 pr-4 rounded-full font-medium tracking-wide transition-all
                      ${
                        location.pathname === item.path
                          ? "bg-light text-[var(--color-sidebar)] dark:bg-[var(--color-button-blue)] dark:text-[var(--color-text-light)] font-semibold pointer-events-none"
                          : "text-[var(--color-text-light)] hover:text-white"
                      }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full py-2 rounded-full 
           bg-[var(--color-button-blue)] 
           text-[var(--color-text-light)] 
           transition-none"
        >
          LOGOUT
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
