import { useEffect, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Hero, Service, AboutUs, OurJourney } from "../components/home";
import { LanguageContext } from "../locales/language.jsx";
import { homeTranslations } from "../locales/home.js"; // ✅ pakai file translate per fitur

const Home = () => {
  const { language } = useContext(LanguageContext);
  const t = homeTranslations[language];

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, 100);

    AOS.init({ once: false, duration: 800, offset: 200 });
  }, []);

  return (
    <main className="font-body text-carbon bg-white dark:bg-[var(--color-background)]">
      <Hero t={t} />
      <Service t={t} />
      <AboutUs t={t} />
      <OurJourney t={t} />
    </main>
  );
};

export default Home;