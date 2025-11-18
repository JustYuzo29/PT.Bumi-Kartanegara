import React, { useEffect, useState } from "react";
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "system");
  const [resolvedTheme, setResolvedTheme] = useState(getSystemTheme());

  // ✅ Terapkan tema ke <html>
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === "system") {
      // Hapus data-theme dan class dark, biarkan CSS media query yang handle
      root.removeAttribute("data-theme");
      const systemTheme = getSystemTheme();
      if (systemTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } else if (theme === "dark") {
      // Dark mode: set data-theme dan class dark
      root.setAttribute("data-theme", "dark");
      root.classList.add("dark");
    } else {
      // Light mode: hapus data-theme dan class dark
      root.removeAttribute("data-theme");
      root.classList.remove("dark");
    }
    
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ✅ Sync dengan sistem kalau pakai mode system
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemChange = () => {
      const newSystemTheme = getSystemTheme();
      setResolvedTheme(newSystemTheme);
      
      // Update class dark sesuai system preference
      if (theme === "system") {
        const root = document.documentElement;
        if (newSystemTheme === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      }
    };

    if (theme === "system") {
      handleSystemChange(); // Update langsung saat komponen mount
      media.addEventListener("change", handleSystemChange);
    }

    return () => {
      media.removeEventListener("change", handleSystemChange);
    };
  }, [theme]);

  // ✅ Cek active state (termasuk system + match)
  const isActive = (target) => theme === target;


  const buttonStyle = (active) => ({
    backgroundColor: active ? "var(--color-navy)" : "transparent",
    color: active ? "#fff" : "var(--color-text)",
    padding: "6px",
    borderRadius: "6px",
    transition: "all 0.2s",
  });

  return (
    <div
      className="fixed top-[100px] md:top-6 right-4 md:right-8 z-[100] flex gap-1 items-center"
      style={{
        background: "var(--color-background)",
        color: "var(--color-text)",
        borderRadius: "var(--radius-default)",
        boxShadow: "var(--shadow-elevated)",
        padding: "6px 8px",
      }}
    >
      {/* Light */}
      <button
        onClick={() => setTheme("light")}
        title="Light Mode"
        style={buttonStyle(isActive("light"))}
      >
        <SunIcon className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {/* Dark */}
      <button
        onClick={() => setTheme("dark")}
        title="Dark Mode"
        style={buttonStyle(isActive("dark"))}
      >
        <MoonIcon className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {/* System */}
      <button
        onClick={() => setTheme("system")}
        title="System Theme"
        style={buttonStyle(theme === "system")}
      >
        <ComputerDesktopIcon className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </div>
  );
}
