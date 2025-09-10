import React, { useState, useEffect, useRef } from "react";
import { Bars3Icon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const Navbar = ({ toggleSidebar }) => {
  const token = localStorage.getItem("access_token");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const dropdownRef = useRef(null);

  // Fetch user (dengan company relasi) dari backend
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("/api/user/me/", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    }
    if (token) fetchUser();
  }, [token]);

  // Search
  useEffect(() => {
    const controller = new AbortController();
    if (search.length > 1 && token) {
      axios.get(`/api/search/?q=${encodeURIComponent(search)}`, {
        signal: controller.signal,
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setSearchResult(res.data.results))
      .catch(() => {});
    } else {
      setSearchResult([]);
    }
    return () => controller.abort();
  }, [search, token]);

  // Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Darkmode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Helper untuk nama
  const getUserDisplayName = () => {
    if (!user) return "...";
    if (user.first_name && user.last_name) return `${user.first_name} ${user.last_name}`;
    if (user.first_name) return user.first_name;
    if (user.username) return user.username;
    return user.email || "...";
  };

  return (
    <header className="
      bg-[var(--color-accent)] 
      dark:bg-[var(--color-button-blue)] 
      px-4 sm:px-6 py-4 
      flex justify-between items-center 
      shadow-md z-10 w-full
    ">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden">
          <Bars3Icon className="h-6 w-6 text-white dark:text-white" />
        </button>
        {/* Logo perusahaan jika ingin */}
        {user?.company?.logo_path && (
          <img
            src={user.company.logo_path}
            alt="Company Logo"
            className="w-10 h-10 rounded-full object-cover bg-white mr-2"
          />
        )}
        <h1 className="
          text-base sm:text-lg md:text-xl 
          font-semibold text-white 
          dark:text-white 
          font-heading uppercase
        ">
          {user ? `Welcome, ${getUserDisplayName()}` : "Welcome, ..."}
        </h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Profile circle kanan (optional) */}
        {user?.profile_image && (
          <img
            src={user.profile_image}
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover bg-white border mr-2"
          />
        )}

        {/* Company Name (optional, tampilkan jika mau branding) */}
        {/* <span className="hidden sm:block text-xs font-semibold text-white dark:text-[var(--color-accent)]">{user?.company?.name}</span> */}

        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search"
            className="
              px-4 py-1.5 rounded-full text-sm w-36 sm:w-48 md:w-64 
              bg-white text-[var(--color-button-blue)] placeholder-[#0B1D51] 
              border border-white 
              dark:bg-[var(--color-card-secondary)] 
              dark:text-[var(--color-button-blue)] 
              dark:placeholder-[var(--color-button-blue)] 
              dark:border-transparent 
              focus:outline-none
            "
          />
          {/* Hasil search */}
          {searchResult.length > 0 && (
            <div className="absolute left-0 mt-1 w-full bg-white dark:bg-[var(--color-card-secondary)] rounded-md shadow-lg z-50 max-h-64 overflow-auto">
              {searchResult.map((item, i) => (
                <div
                  key={i}
                  className="px-4 py-2 hover:bg-[var(--color-accent)] cursor-pointer text-sm"
                  // onClick={() => handleClick(item)}
                >
                  {item.title || item.name}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Settings Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="p-2 rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition"
            aria-label="Settings"
          >
            <Cog6ToothIcon className="w-6 h-6 text-white dark:text-white" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[var(--color-button-blue)] rounded-lg shadow-lg z-50 py-3 px-4">
              <div className="flex items-center justify-between text-sm font-medium text-black dark:text-white">
                <span>Dark Mode</span>
                <button
                  onClick={toggleDarkMode}
                  className="relative w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full transition"
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition ${darkMode ? "translate-x-5" : ""}`}
                  />
                </button>
              </div>
              {/* Tambahkan menu profile/logout jika mau */}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
