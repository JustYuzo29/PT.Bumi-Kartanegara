import { useEffect, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Hero, Gallery } from "../../components/public/Media";
import { LanguageContext } from "../../locales/language.jsx";
import { mediaTranslations } from "../../locales/media.js";

const Media = () => {
  const { language } = useContext(LanguageContext);
  const t = mediaTranslations[language];

  useEffect(() => {
    AOS.init({ once: false, duration: 800, offset: 200 });
  }, []);

  return (
    <main className="font-body bg-theme text-theme hide-scrollbar">
      <Hero t={t} />
      <Gallery t={t} />
    </main>
  );
};

export default Media;