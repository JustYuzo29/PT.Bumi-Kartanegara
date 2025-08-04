import React, { useContext } from "react";
import { LanguageContext } from "../locales/language";
import { aboutTranslations } from "../locales/about";

import { Hero, Tentang, VM, Struktur, Partner } from "../components/About";

const About = () => {
  const { language } = useContext(LanguageContext);
  const t = aboutTranslations[language]; // Ambil translate sesuai bahasa

  return (
    <main>
      {/* Kirim props t ke setiap komponen */}
      <Hero t={t} />
      <Tentang t={t} />
      <VM t={t} />
      <Struktur t={t} />
      <Partner t={t} />
    </main>
  );
};

export default About;