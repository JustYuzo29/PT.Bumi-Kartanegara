import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroAbout from "../../../assets/company/HeroAbout.webp";
import Hero1 from "../../../assets/company/Oj1.webp";
import Hero2 from "../../../assets/company/About1.webp";

const Hero = ({ t }) => {
  useEffect(() => {
    AOS.init({ once: false, duration: 1000 });
  }, []);

  return (
    <section
      className="relative w-full min-h-screen bg-cover bg-center overflow-hidden rounded-b-[80px] md:rounded-b-[200px]"
      style={{ backgroundImage: `url(${HeroAbout})` }}
    >
      {/* Overlay hitam transparan */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 lg:px-12 py-20 md:py-32 lg:py-40">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-start">
          {/* Kolom Kiri */}
          <div
            data-aos="fade-right"
            className="relative text-white text-center lg:text-right flex flex-col items-center lg:items-end gap-y-4 md:gap-y-6"
          >
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug">
              {t.heroAboutTitleLeft}
            </h1>
            <p className="text-sm md:text-base lg:text-lg max-w-md">
              {t.heroAboutDescLeft}
            </p>
            <div className="mt-4 md:mt-8 w-full">
              <img
                src={Hero2}
                alt="hero2"
                className="rounded-lg md:rounded-xl shadow-xl w-full max-w-lg object-cover aspect-[16/9] mx-auto lg:mx-0"
              />
            </div>
          </div>

          {/* Kolom Kanan */}
          <div
            data-aos="fade-left"
            className="flex flex-col justify-start gap-4 md:gap-6 lg:gap-8 text-white text-center lg:text-left items-center lg:items-start"
          >
            <div className="self-center lg:self-start w-full">
              <img
                src={Hero1}
                alt="hero1"
                className="rounded-lg md:rounded-xl shadow-xl w-full max-w-lg object-cover aspect-[16/9] mx-auto lg:mx-0"
              />
            </div>

            <div className="space-y-2 md:space-y-3">
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug">
                {t.heroAboutTitleRight}
              </h1>
              <p className="text-sm md:text-base lg:text-lg max-w-md mx-auto lg:mx-0">
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