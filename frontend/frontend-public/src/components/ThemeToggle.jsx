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
    if (theme === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ✅ Sync dengan sistem kalau pakai mode system
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemChange = () => {
      setResolvedTheme(getSystemTheme());
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
      style={{
        position: "fixed",
        top: "24px",
        right: "32px",
        zIndex: 100,
        background: "var(--color-background)",
        color: "var(--color-text)",
        borderRadius: "var(--radius-default)",
        boxShadow: "var(--shadow-elevated)",
        padding: "8px 12px",
        display: "flex",
        gap: "4px",
        alignItems: "center",
      }}
    >
      {/* Light */}
      <button
        onClick={() => setTheme("light")}
        title="Light Mode"
        style={buttonStyle(isActive("light"))}
      >
        <SunIcon className="w-5 h-5" />
      </button>

      {/* Dark */}
      <button
        onClick={() => setTheme("dark")}
        title="Dark Mode"
        style={buttonStyle(isActive("dark"))}
      >
        <MoonIcon className="w-5 h-5" />
      </button>

      {/* System */}
      <button
        onClick={() => setTheme("system")}
        title="System Theme"
        style={buttonStyle(theme === "system")}
      >
        <ComputerDesktopIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
