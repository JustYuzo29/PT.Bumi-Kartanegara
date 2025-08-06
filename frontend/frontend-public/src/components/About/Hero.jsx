import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroAbout from "../../assets/company/HeroAbout.png";
import Hero1 from "../../assets/company/Oj1.jpg";
import Hero2 from "../../assets/company/About1.jpg";

const Hero = ({ t }) => {
  useEffect(() => {
    AOS.init({ once: false, duration: 1000 });
  }, []);

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center overflow-hidden rounded-b-[200px]"
      style={{ backgroundImage: `url(${HeroAbout})`, backgroundColor: "var(--color-about-bg)" }}
    >
      {/* Overlay hitam transparan */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-40">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Kolom Kiri */}
          <div
            data-aos="fade-right"
            className="relative text-white text-right flex flex-col items-end gap-y-6"
          >
            <h1 className="text-2xl md:text-3xl font-bold leading-snug">
              {t.heroAboutTitleLeft}
            </h1>
            <p className="text-base md:text-lg max-w-md">
              {t.heroAboutDescLeft}
            </p>
            <div className="mt-21">
              <img
                src={Hero2}
                alt="hero2"
                className="rounded-xl shadow-xl w-full max-w-lg object-cover aspect-[16/9]"
              />
            </div>
          </div>

          {/* Kolom Kanan */}
          <div
            data-aos="fade-left"
            className="flex flex-col justify-start gap-8 text-white"
          >
            <div className="self-start">
              <img
                src={Hero1}
                alt="hero1"
                className="rounded-xl shadow-xl w-full max-w-lg object-cover aspect-[16/9]"
              />
            </div>

            <div className="space-y-3">
              <h1 className="text-2xl md:text-3xl font-bold leading-snug">
                {t.heroAboutTitleRight}
              </h1>
              <p className="text-base md:text-lg max-w-md">
                {t.heroAboutDescRight}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;