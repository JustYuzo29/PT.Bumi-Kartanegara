import { useEffect, useContext } from "react";
import { Hero, Kontak, Maps } from "../components/Contact";
import { LanguageContext } from "../locales/language";
import { contactTranslations } from "../locales/contact";

const Contact = () => {
  const { language } = useContext(LanguageContext);
  const t = contactTranslations[language];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="font-body text-carbon bg-white dark:bg-[var(--color-background)]">
      <Hero t={t} />
      <Kontak t={t} />
      <Maps t={t} />
    </main>
  );
};

export default Contact;
