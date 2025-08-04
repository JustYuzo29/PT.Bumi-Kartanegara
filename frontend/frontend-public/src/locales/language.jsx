import React, { createContext, useState, useEffect } from "react";

const LanguageContext = createContext(); // ✅ Gunakan const biasa

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("ENGLISH");

  useEffect(() => {
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.toLowerCase().startsWith("id")) {
      setLanguage("INDONESIA");
    } else {
      setLanguage("ENGLISH");
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };