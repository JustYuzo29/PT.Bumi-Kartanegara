import React, { createContext, useState, useEffect } from "react";

const LanguageContext = createContext(); // ✅ Gunakan const biasa

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("INDONESIA");

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };