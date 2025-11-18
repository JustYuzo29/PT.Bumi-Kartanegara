import { useEffect, useContext } from "react";
import { Hero, OurService, Tools } from "../../components/public/Service";
import { LanguageContext } from "../../locales/language.jsx";
import { serviceTranslations } from "../../locales/service.js";

const Service = () => {
  const { language } = useContext(LanguageContext);
  const t = serviceTranslations[language];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="font-body bg-theme text-theme transition-colors duration-300 w-full overflow-x-hidden">
      <Hero t={t} />
      <OurService t={t} />
      <Tools t={t} />
    </main>
  );
};

export default Service;