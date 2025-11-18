import { useEffect, useContext } from "react";
import { Hero, Gallery } from "../../components/public/Media";
import { LanguageContext } from "../../locales/language.jsx";
import { mediaTranslations } from "../../locales/media.js";

const Media = () => {
  const { language } = useContext(LanguageContext);
  const t = mediaTranslations[language];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="font-body bg-theme text-theme transition-colors duration-300">
      <Hero t={t} />
      <Gallery t={t} />
    </main>
  );
};

export default Media;