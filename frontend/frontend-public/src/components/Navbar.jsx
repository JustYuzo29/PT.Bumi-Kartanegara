import React, { useState, useEffect } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/navbar/logo.png";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [language, setLanguage] = useState("ENGLISH");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false); // animasi muncul

  const menuItems = [
    { name: "HOME", path: "/" },
    { name: "ABOUT", path: "/about" },
    { name: "MEDIA", path: "/media" },
    { name: "SERVICE", path: "/service" },
    { name: "CONTACT", path: "/contact" },
  ];

  const toggleDropdown = () => setOpenDropdown(!openDropdown);
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setOpenDropdown(false);
  };

  const hasActiveMenu = menuItems.some((m) => currentPath === m.path);

  useEffect(() => {
    const timer = setTimeout(() => setShowNavbar(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-6 w-full flex justify-center z-50">
      <div
        className={`shadow-lg rounded-full px-6 py-1.5 flex items-center justify-between gap-6 w-[90%] max-w-[900px] bg-white dark:bg-[#0a0a23] transition-all duration-700 ease-out transform ${
          showNavbar ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-7 h-7 object-contain" />
          <span className="text-[13px] font-semibold whitespace-nowrap text-gray-800 dark:text-white">
            PT. BUMI KARTANEGARA
          </span>
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-3 text-[12px] font-semibold uppercase">
          {menuItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-[#1E3E62] text-white"
                    : `text-gray-800 dark:text-white ${
                        !hasActiveMenu
                          ? "hover:bg-[#1E3E62] hover:text-white"
                          : ""
                      }`
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className={`text-gray-800 dark:text-white focus:outline-none transition-transform duration-500 ${
              showMobileMenu ? "rotate-90" : "rotate-0"
            }`}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>

        {/* Dropdown Bahasa (Desktop) */}
        <div className="relative hidden md:block">
          <button
            onClick={toggleDropdown}
            className="min-w-[110px] text-center text-[12px] lowercase px-3 py-1.5 rounded-full bg-[#1E3E62] text-white"
          >
            {language.toLowerCase()}
          </button>

          {openDropdown && (
            <div className="absolute right-0 mt-2 w-28 shadow-md rounded-md text-[12px] overflow-hidden z-50 bg-white dark:bg-[#00022C]">
              {["ENGLISH", "INDONESIA"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className="block w-full text-left px-4 py-2 transition-all text-gray-800 dark:text-white hover:bg-[#1E3E62] hover:text-white"
                >
                  {lang.charAt(0) + lang.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {showMobileMenu && (
        <div className="absolute top-[70px] w-[90%] max-w-[900px] mx-auto bg-white dark:bg-[#0a0a23] rounded-xl shadow-lg p-4 md:hidden z-40">
          <div className="flex flex-col gap-2 text-[12px] font-semibold uppercase">
            {menuItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setShowMobileMenu(false)}
                  className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-[#1E3E62] text-white"
                      : "text-gray-800 dark:text-white hover:bg-[#1E3E62] hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            {/* Language Dropdown Mobile */}
            <div className="pt-2 border-t border-gray-300 dark:border-gray-700">
              <button
                onClick={toggleDropdown}
                className="w-full text-left px-3 py-2 rounded-lg bg-[#1E3E62] text-white text-[12px] lowercase"
              >
                {language.toLowerCase()}
              </button>

              {openDropdown && (
                <div className="mt-2 w-full shadow-md rounded-md text-[12px] overflow-hidden bg-white dark:bg-[#00022C]">
                  {["ENGLISH", "INDONESIA"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className="block w-full text-left px-4 py-2 transition-all text-gray-800 dark:text-white hover:bg-[#1E3E62] hover:text-white"
                    >
                      {lang.charAt(0) + lang.slice(1).toLowerCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
