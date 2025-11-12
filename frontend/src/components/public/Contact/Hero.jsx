import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import BgContact from "../../../assets/company/Contact.png";
import MapLight from "../../../assets/company/Indonesia.png";
import MapDark from "../../../assets/company/Indonesia dark mode.png";

const Hero = ({ t }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    AOS.init({ once: false, duration: 1000 });

    const updateTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      if (theme === "dark") {
        setIsDark(true);
      } else if (theme === "light") {
        setIsDark(false);
      } else {
        // auto
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDark(prefersDark);
      }
    };

    updateTheme(); // initial check

    // Pantau perubahan atribut data-theme
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Pantau juga perubahan preferensi sistem jika pakai mode auto
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", updateTheme);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", updateTheme);
    };
  }, []);

  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      aria-label="Contact Hero Section"
    >
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${BgContact})` }}
      ></div>

      <div className="absolute inset-0 bg-black/80 z-[1]" />

      <div className="relative z-[2] flex flex-col items-center justify-center h-full pt-20 text-white text-center px-4 overflow-hidden">
        <div data-aos="fade-up" className="max-w-3xl mb-6 md:mb-8">
          <h1 className="text-2xl md:text-5xl font-bold mb-4">{t.heroTitle}</h1>
          <p className="text-sm md:text-base font-light">{t.heroSubtitle}</p>
        </div>

        <div className="w-full flex justify-center items-center overflow-hidden">
          <img
            src={isDark ? MapDark : MapLight}
            alt="Peta Indonesia"
            className="w-[95%] sm:w-[80%] md:w-[65%] lg:w-[55%] max-w-4xl h-auto object-contain pointer-events-none"
            data-aos="zoom-in"
            data-aos-delay="500"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
