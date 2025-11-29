import { useEffect, useContext } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Hero, Kontak, Maps } from "../../components/public/Contact";
import { LanguageContext } from "../../locales/language.jsx";
import { contactTranslations } from "../../locales/contact.js";

const Contact = () => {
  const { language } = useContext(LanguageContext);
  const t = contactTranslations[language];

  useEffect(() => {
    AOS.init({ once: false, duration: 800, offset: 200 });
  }, []);

  return (
    <main className="font-body bg-theme text-theme hide-scrollbar">
      <Hero t={t} />
      <Kontak t={t} />
      <Maps t={t} />
    </main>
  );
};

export default Contact;
