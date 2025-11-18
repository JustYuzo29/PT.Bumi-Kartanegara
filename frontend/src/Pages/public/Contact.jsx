import { useEffect, useContext } from "react";
import { Hero, Kontak, Maps } from "../../components/public/Contact";
import { LanguageContext } from "../../locales/language.jsx";
import { contactTranslations } from "../../locales/contact.js";

const Contact = () => {
  const { language } = useContext(LanguageContext);
  const t = contactTranslations[language];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="font-body bg-theme text-theme">
      <Hero t={t} />
      <Kontak t={t} />
      <Maps t={t} />
    </main>
  );
};

export default Contact;
