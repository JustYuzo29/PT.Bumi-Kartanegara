import React, { createContext, useState, useEffect } from "react";

const LanguageContext = createContext(); // ✅ Gunakan const biasa

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Gunakan key baru 'preferredLanguage' agar reset untuk semua user
    // Default ke INDONESIA untuk pengunjung pertama kali atau yang belum set
    const savedLang = localStorage.getItem("preferredLanguage");
    return savedLang || "INDONESIA";
  });

  // Simpan ke localStorage setiap kali bahasa berubah
  useEffect(() => {
    localStorage.setItem("preferredLanguage", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };