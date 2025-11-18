
import { useEffect, useState } from "react";

const useDarkMode = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes and attributes
    root.classList.remove("dark", "light");
    
    // Apply the new theme
    root.setAttribute("data-theme", theme);
    root.classList.add(theme);
    
    // Force update body styles
    if (theme === "dark") {
      document.body.style.setProperty("background-color", "#0B192C", "important");
      document.body.style.setProperty("color", "#ffffff", "important");
    } else {
      document.body.style.setProperty("background-color", "#ffffff", "important");
      document.body.style.setProperty("color", "#213547", "important");
    }
    
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return [theme, toggleTheme];
};

export default useDarkMode;
