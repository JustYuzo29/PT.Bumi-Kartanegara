import { useEffect, useContext } from "react";
import { Hero, Gallery } from "../components/Media";
import { LanguageContext } from "../locales/language.jsx";
import { mediaTranslations } from "../locales/media.js";

const Media = () => {
  const { language } = useContext(LanguageContext);
  const t = mediaTranslations[language];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main
      className="font-body text-[var(--color-text)] transition-colors duration-300"
      style={{ backgroundColor: "var(--color-pages)" }}
    >
      <Hero t={t} />
      <Gallery t={t} />
    </main>
  );
};

export default Media;